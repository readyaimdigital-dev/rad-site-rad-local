import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import { meta } from "./config/rad-local-design-content";
import { site } from "./config/site";

const requestUrl = (path: string) => new Request(new URL(path, "http://localhost/"));

describe("page composition uses the neutral section library", () => {
  it("home page uses the approved RAD Local design layer", () => {
    const source = readFileSync("src/pages/index.astro", "utf8");
    expect(source).toContain("RadLocalDesignLayout.astro");
    expect(source).toContain("rad-local-design-content");
    expect(source).toContain("routes.freeDemo");
  });

  it("services page composes JumpLinkHero and ServiceBand from the shared catalogue", () => {
    const source = readFileSync("src/pages/services.astro", "utf8");
    expect(source).toMatch(/from\s+["']..\/components\/sections\/JumpLinkHero\.astro["']/);
    expect(source).toMatch(/from\s+["']..\/components\/sections\/ServiceBand\.astro["']/);
    expect(source).toContain("content.services");
    expect(source).toContain("content.servicesPage.description");
    expect(source).not.toContain('"Free quote"');
    expect(source).toContain("servicesPage.serviceLabels.pricingValue");
  });

  it("about page uses the approved RAD Local design layer", () => {
    const source = readFileSync("src/pages/about.astro", "utf8");
    expect(source).toContain("RadLocalDesignLayout.astro");
    expect(source).toContain("rad-local-design-content");
    expect(source).toContain("routes.guaranteeTerms");
  });

  it("contact page keeps the existing ContactForm handler and composes ContactSplit", () => {
    const source = readFileSync("src/pages/contact.astro", "utf8");
    expect(source).toContain('from "../components/ui/ContactForm.astro"');
    expect(source).toMatch(/from\s+["']..\/components\/sections\/ContactSplit\.astro["']/);
    expect(source).toContain("content.contact.description");
    expect(source).not.toContain("<style>");
  });

  it("keeps page-level styles on the shared design-token contract", () => {
    const pagePaths = ["src/pages/services.astro", "src/pages/contact.astro"];
    const rawColour = /#[0-9a-f]{3,8}\b|rgba?\(/i;
    const rawTypeSize = /font-size:\s*(?!var\(|inherit)[^;]*(?:rem|px)\b/i;
    const rawSpacing =
      /(?:margin(?:-(?:top|right|bottom|left))?|padding(?:-(?:top|right|bottom|left))?|gap|row-gap|column-gap):\s*[^;]*(?:rem|px)\b/i;

    for (const pagePath of pagePaths) {
      const source = readFileSync(pagePath, "utf8");
      const style = source.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
      expect(style, `${pagePath} should not hard-code colours`).not.toMatch(rawColour);
      expect(style, `${pagePath} should not hard-code type sizes`).not.toMatch(rawTypeSize);
      expect(style, `${pagePath} should not hard-code reusable spacing`).not.toMatch(rawSpacing);
    }

    const designLayout = readFileSync("src/layouts/RadLocalDesignLayout.astro", "utf8");
    expect(designLayout).toContain("rad-local-design-global.css");
    expect(designLayout).toContain("BaseHead");
    expect(designLayout).toContain("SchemaOrg");
  });
});

describe("page composition real render", () => {
  it("renders the home page without crashing", async () => {
    const { default: Home } = await import("./pages/index.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(Home, { request: requestUrl("/") });

    expect(html).toContain("<html");
    expect(html).toContain(meta.home.title.replace(" | RAD Local", ""));
  });

  it("renders the services page without crashing", async () => {
    const { default: Services } = await import("./pages/services.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(Services, { request: requestUrl("/services") });

    expect(html).toContain("<html");
  });

  it("renders the about page without crashing", async () => {
    const { default: About } = await import("./pages/about.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(About, { request: requestUrl("/about") });

    expect(html).toContain("<html");
    expect(html).toContain(meta.about.title.replace(" | RAD Local", ""));
  });

  it("renders the contact page without crashing", async () => {
    const { default: Contact } = await import("./pages/contact.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(Contact, { request: requestUrl("/contact") });

    expect(html).toContain("<html");
    expect(html).toContain("contact-form");
    expect(html).toContain(`mailto:${site.contact.email}`);
    expect(html).toContain(site.contact.email);
    expect(html).toContain(site.address.street);
    expect(html).toContain(site.address.suburb);
  });
});
