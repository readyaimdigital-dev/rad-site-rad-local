import { describe, expect, it, vi, beforeEach } from "vitest";

const sendContactEmailMock = vi.fn();

vi.mock("./send-contact-email", () => ({
  sendContactEmail: sendContactEmailMock,
}));

const { POST } = await import("../pages/api/contact");

function makeRequest(body: unknown) {
  return new Request("https://example.com.au/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Jordan Smith",
  email: "jordan@example.com.au",
  phone: "0412 345 678",
  message: "Can I get a quote?",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendContactEmailMock.mockReset();
  });

  it("sends the email and returns ok for a valid submission", async () => {
    sendContactEmailMock.mockResolvedValue(undefined);

    const response = await POST({ request: makeRequest(validBody) } as any);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(sendContactEmailMock).toHaveBeenCalledTimes(1);
  });

  it("returns 400 with field errors for an invalid submission", async () => {
    const response = await POST({
      request: makeRequest({ ...validBody, email: "not-an-email" }),
    } as any);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.errors.email).toBeDefined();
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("silently drops submissions caught by the honeypot", async () => {
    const response = await POST({
      request: makeRequest({ ...validBody, website: "http://spam.example" }),
    } as any);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("returns a safe error response when sending fails, without leaking details", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    sendContactEmailMock.mockRejectedValue(new Error("resend api key invalid: «redacted:sk_live_…»"));

    const response = await POST({ request: makeRequest(validBody) } as any);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.ok).toBe(false);
    expect(body.error).not.toContain("«redacted:sk_live_…»");
    expect(consoleError).toHaveBeenCalledWith("Contact form email failed to send.");
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("api key");
    consoleError.mockRestore();
  });

  it("rejects an oversized request before sending email", async () => {
    const response = await POST({
      request: makeRequest({ ...validBody, message: "x".repeat(20_000) }),
    } as any);

    expect(response.status).toBe(413);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("stops reading a streamed body once the request limit is exceeded", async () => {
    const chunk = new Uint8Array(1024).fill(120);
    let bytesProvided = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        bytesProvided += chunk.byteLength;
        controller.enqueue(chunk);
        if (bytesProvided >= 1024 * 1024) controller.close();
      },
    });
    const request = new Request("https://example.com.au/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    const response = await POST({ request } as any);

    expect(response.status).toBe(413);
    expect(bytesProvided).toBeLessThan(64 * 1024);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed request body", async () => {
    const request = new Request("https://example.com.au/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });

    const response = await POST({ request } as any);
    expect(response.status).toBe(400);
  });

  it.each([null, [], "text", 42])(
    "returns 400 when valid JSON is not an object: %j",
    async (body) => {
      const response = await POST({ request: makeRequest(body) } as any);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.ok).toBe(false);
      expect(sendContactEmailMock).not.toHaveBeenCalled();
    }
  );
});
