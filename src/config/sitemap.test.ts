import { describe, expect, it } from "vitest";
import { shouldIncludeInSitemap } from "./sitemap";

describe("shouldIncludeInSitemap", () => {
  it("excludes noindex legal templates", () => {
    expect(shouldIncludeInSitemap("https://example.com.au/privacy/")).toBe(false);
    expect(shouldIncludeInSitemap("https://example.com.au/terms/")).toBe(false);
  });

  it("includes indexable client pages", () => {
    expect(shouldIncludeInSitemap("https://example.com.au/" )).toBe(true);
    expect(shouldIncludeInSitemap("https://example.com.au/contact/")).toBe(true);
  });
});
