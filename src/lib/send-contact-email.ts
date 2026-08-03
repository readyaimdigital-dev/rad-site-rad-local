import { Resend } from "resend";
import { site } from "../config/site";
import type { ContactFormData } from "./contact-validation";

export class ContactEmailConfigError extends Error {}
export class ContactEmailSendError extends Error {}

export interface ContactEmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

/** Reads server-only env vars. Never expose these to the browser. */
export function getContactEmailConfig(): ContactEmailConfig | null {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return null;
  }

  return { apiKey, to, from };
}

/**
 * Sends a contact-form submission via Resend. Accepts an explicit config so
 * callers (and tests) can bypass env-var loading; production code relies on
 * the getContactEmailConfig() default.
 */
export async function sendContactEmail(
  data: ContactFormData,
  config: ContactEmailConfig | null = getContactEmailConfig()
): Promise<void> {
  if (!config) {
    throw new ContactEmailConfigError("Contact email is not configured.");
  }

  const resend = new Resend(config.apiKey);

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `New enquiry from ${data.name} via ${site.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (error) {
    throw new ContactEmailSendError(error.message ?? "Resend returned an error.");
  }
}
