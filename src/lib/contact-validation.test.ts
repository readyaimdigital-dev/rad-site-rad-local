import { describe, expect, it } from "vitest";
import { validateContact } from "./contact-validation";

const validInput = {
  name: "Jordan Smith",
  email: "jordan@example.com.au",
  phone: "0412 345 678",
  message: "Can I get a quote for a bathroom renovation?",
};

describe("validateContact", () => {
  it("accepts a fully valid submission", () => {
    const result = validateContact(validInput);
    expect(result.valid).toBe(true);
    expect(result.isSpam).toBe(false);
    expect(result.data).toEqual({
      name: "Jordan Smith",
      email: "jordan@example.com.au",
      phone: "0412 345 678",
      message: "Can I get a quote for a bathroom renovation?",
    });
  });

  it("normalises email to lower case and trims whitespace", () => {
    const result = validateContact({
      ...validInput,
      name: "  Jordan Smith  ",
      email: "  Jordan@EXAMPLE.com.au ",
    });
    expect(result.data?.name).toBe("Jordan Smith");
    expect(result.data?.email).toBe("jordan@example.com.au");
  });

  it("treats phone as optional", () => {
    const { phone, ...rest } = validInput;
    const result = validateContact(rest);
    expect(result.valid).toBe(true);
    expect(result.data?.phone).toBe("");
  });

  it("rejects a missing name", () => {
    const { name, ...rest } = validInput;
    const result = validateContact(rest);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects an invalid email", () => {
    const result = validateContact({ ...validInput, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("rejects an invalid phone when provided", () => {
    const result = validateContact({ ...validInput, phone: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("rejects control characters in the name used by the email subject", () => {
    const result = validateContact({
      ...validInput,
      name: "Jordan\r\nBcc: attacker@example.com",
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it.each(["\u0000", "\u007f", "\u0085"])(
    "rejects %j in the email used by the Reply-To header",
    (controlCharacter) => {
      const result = validateContact({
        ...validInput,
        email: `jordan${controlCharacter}@example.com.au`,
      });

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBeDefined();
    }
  );

  it("rejects a missing message", () => {
    const { message, ...rest } = validInput;
    const result = validateContact(rest);
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it("flags a filled honeypot field as spam without failing validation", () => {
    const result = validateContact({ ...validInput, website: "http://spam.example" });
    expect(result.isSpam).toBe(true);
    expect(result.valid).toBe(true);
  });

  it("does not flag an empty honeypot field", () => {
    const result = validateContact({ ...validInput, website: "" });
    expect(result.isSpam).toBe(false);
  });
});
