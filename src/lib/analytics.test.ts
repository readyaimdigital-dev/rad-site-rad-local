import { describe, expect, it } from "vitest";
import { buildGa4InlineScript, normaliseGa4Id } from "./analytics";

describe("GA4 configuration", () => {
  it("accepts a valid GA4 measurement ID", () => {
    expect(normaliseGa4Id("G-ABC123XYZ9")).toBe("G-ABC123XYZ9");
  });

  it("rejects script-breaking and malformed values", () => {
    expect(normaliseGa4Id("G-TEST');globalThis.injected=1;//")).toBeNull();
    expect(normaliseGa4Id("UA-12345-1")).toBeNull();
    expect(normaliseGa4Id("")).toBeNull();
  });

  it("serialises the accepted ID instead of interpolating executable text", () => {
    const script = buildGa4InlineScript("G-ABC123XYZ9");

    expect(script).toContain('gtag("config", "G-ABC123XYZ9")');
    expect(script).not.toContain("globalThis.injected");
  });
});
