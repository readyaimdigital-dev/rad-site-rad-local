import { describe, expect, it } from "vitest";
import { shouldIncludeInSitemap } from "./sitemap";
import { site } from "./site";
import { GET as getRobotsTxt } from "../pages/robots.txt";

describe("shouldIncludeInSitemap", () => {
  it("excludes noindex legal templates", () => {
    expect(shouldIncludeInSitemap("https://example.com.au/privacy/")).toBe(false);
    expect(shouldIncludeInSitemap("https://example.com.au/terms/")).toBe(false);
  });

  it("includes indexable client pages", () => {
    expect(shouldIncludeInSitemap("https://example.com.au/" )).toBe(true);
    expect(shouldIncludeInSitemap("https://example.com.au/contact/")).toBe(true);
  });

  it("advertises the conventional sitemap.xml URL in robots.txt", async () => {
    const response = await getRobotsTxt({} as never);

    expect(await response.text()).toContain(`Sitemap: ${site.url}/sitemap.xml`);
  });
});
