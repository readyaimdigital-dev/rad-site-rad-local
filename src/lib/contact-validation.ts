export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  /** True when the honeypot field was filled in (likely a bot). */
  isSpam: boolean;
  errors: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  data: ContactFormData | null;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{6,25}$/;
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f-\u009f]/;

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

function toStringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates and normalises raw contact-form input. Accepts an untyped
 * record because it reads directly from parsed request bodies.
 */
export function validateContact(input: Record<string, unknown>): ContactValidationResult {
  const honeypot = toStringField(input.website ?? input._gotcha);
  const isSpam = honeypot.length > 0;

  const name = toStringField(input.name);
  const email = toStringField(input.email).toLowerCase();
  const phone = toStringField(input.phone);
  const message = toStringField(input.message);

  const errors: ContactValidationResult["errors"] = {};

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (CONTROL_CHARACTER_PATTERN.test(name)) {
    errors.name = "Please enter a valid name.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = "Name is too long.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (
    email.length > MAX_EMAIL_LENGTH ||
    CONTROL_CHARACTER_PATTERN.test(email) ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Message is too long.";
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    isSpam,
    errors,
    data: valid ? { name, email, phone, message } : null,
  };
}
