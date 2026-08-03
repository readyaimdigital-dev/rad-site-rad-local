import { describe, expect, it, vi, beforeEach } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function MockResend() {
    return { emails: { send: sendMock } };
  }),
}));

const { sendContactEmail, ContactEmailConfigError, ContactEmailSendError } = await import(
  "./send-contact-email"
);

const config = { apiKey: "test-key", to: "owner@example.com.au", from: "site@example.com.au" };
const data = {
  name: "Jordan Smith",
  email: "jordan@example.com.au",
  phone: "0412 345 678",
  message: "Quote please.",
};

describe("sendContactEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it("throws ContactEmailConfigError when config is missing", async () => {
    await expect(sendContactEmail(data, null)).rejects.toBeInstanceOf(ContactEmailConfigError);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("calls Resend with the expected payload", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });

    await sendContactEmail(data, config);

    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.from).toBe(config.from);
    expect(call.to).toBe(config.to);
    expect(call.replyTo).toBe(data.email);
    expect(call.text).toContain(data.name);
    expect(call.text).toContain(data.message);
  });

  it("throws ContactEmailSendError when Resend returns an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "Invalid from address" } });

    await expect(sendContactEmail(data, config)).rejects.toBeInstanceOf(ContactEmailSendError);
  });
});
