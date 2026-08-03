import { describe, expect, it } from "vitest";
import { buildLocalBusinessSchema, serializeJsonLd } from "./schema";
import { site } from "./site";

describe("buildLocalBusinessSchema", () => {
  const schema = buildLocalBusinessSchema();

  it("produces a valid LocalBusiness type", () => {
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
  });

  it("derives business facts from site.ts", () => {
    expect(schema.name).toBe(site.name);
    expect(schema.telephone).toBe(site.contact.phone);
    expect(schema.address.addressLocality).toBe(site.address.suburb);
  });

  it("never contains a RAD reference", () => {
    const serialised = JSON.stringify(schema).toLowerCase();
    expect(serialised).not.toContain("ready aim digital");
    expect(serialised).not.toContain("readyaim.digital");
  });

  it("has no author field", () => {
    expect(schema).not.toHaveProperty("author");
  });

  it("serialises client content without allowing a script-element breakout", () => {
    const serialised = serializeJsonLd({ name: "</script><script>alert(1)</script>" });

    expect(serialised).not.toContain("</script>");
    expect(serialised).toContain("\\u003c/script>");
  });
});
