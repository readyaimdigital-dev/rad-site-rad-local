import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import ContactForm from "./ContactForm.astro";

describe("ContactForm", () => {
  it("keeps native browser validation enabled", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ContactForm);

    expect(html).not.toContain("novalidate");
    expect(html).toContain("required");
  });
});
