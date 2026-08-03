import type { APIRoute } from "astro";
import { validateContact } from "../../lib/contact-validation";
import { sendContactEmail } from "../../lib/send-contact-email";

export const prerender = false;
const MAX_REQUEST_BYTES = 16_384;

class RequestBodyTooLargeError extends Error {}

async function readBoundedBody(request: Request): Promise<Uint8Array> {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    throw new RequestBodyTooLargeError();
  }

  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new RequestBodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;

  try {
    const body = await readBoundedBody(request);
    const bodyText = new TextDecoder().decode(body);
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const parsed: unknown = JSON.parse(bodyText);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return jsonResponse(400, { ok: false, error: "Could not read the submitted form." });
      }
      payload = parsed as Record<string, unknown>;
    } else {
      const boundedRequest = new Request(request.url, {
        method: "POST",
        headers: request.headers,
        body: bodyText,
      });
      const form = await boundedRequest.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return jsonResponse(413, { ok: false, error: "The submitted form is too large." });
    }
    return jsonResponse(400, { ok: false, error: "Could not read the submitted form." });
  }

  const result = validateContact(payload);

  if (!result.valid) {
    return jsonResponse(400, { ok: false, errors: result.errors });
  }

  // Silently accept bot submissions caught by the honeypot without sending
  // email or revealing the detection to the caller.
  if (result.isSpam) {
    return jsonResponse(200, { ok: true });
  }

  try {
    await sendContactEmail(result.data!);
  } catch {
    console.error("Contact form email failed to send.");
    return jsonResponse(502, {
      ok: false,
      error: "We couldn't send your message right now. Please try again shortly.",
    });
  }

  return jsonResponse(200, { ok: true });
};
