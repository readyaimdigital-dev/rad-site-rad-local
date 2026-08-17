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
    expect(source).toContain("How The Setout works");
    expect(source).toContain("set·out <span>· noun · trade term</span>");
    expect(source).toContain("Every good tradie sets out a job before they build it.");
    expect(source).toContain("<p>We do the same thing with your website.</p>");
    expect(source).toContain("<p>Google. Maps. AI search.</p>");
    expect(source).toContain("<p>Mapped first, built second.</p>");
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
    expect(source).not.toContain("We're new, so you won't find hundreds of reviews yet.");
    expect(source).toContain('Anyone can say "trust me". In this industry, plenty do.');
    expect(source).toContain('<p>We\'d rather show you.</p>');
    expect(source).toContain("The team behind RAD Local has been building websites at Ready Aim Digital for more than 15 years");
    expect(source).toContain('<p>But reviews only tell you how it went for someone else.</p>');
    expect(source).toContain("So everything below is published in writing, before you sign up... not hidden in fine print after.");
    expect(source).toContain("Published before you sign up, so you know exactly where you stand.");
    expect(source).toContain('href="https://readyaim.digital/recent-works/" target="_blank" rel="noopener noreferrer"');
    expect(source).toContain('href="https://readyaim.digital/#reviews" target="_blank" rel="noopener noreferrer"');
  });

  it("builds the placeholder legal pages from one design-layer content source", () => {
    const privacySource = readFileSync("src/pages/privacy.astro", "utf8");
    const termsSource = readFileSync("src/pages/terms.astro", "utf8");
    const legalSource = readFileSync("src/config/rad-local-legal-content.ts", "utf8");
    const documentSource = readFileSync("src/components/rad-local/LegalDocument.astro", "utf8");

    expect(privacySource).toContain("legalPages.privacy");
    expect(termsSource).toContain("legalPages.terms");
    expect(legalSource).toContain("placeholder legal content");
    expect(legalSource).toContain("id: 'guarantee'");
    expect(legalSource).toContain("id: 'getting'");
    expect(legalSource).toContain("id: 'usual-bits'");
    expect(legalSource).toContain("eyebrow: 'PRIVACY'");
    expect(legalSource).toContain('oaic.gov.au');
    expect(legalSource).toContain('3.2 Anything we create for your business');
    expect(legalSource).toContain('11.5 When you cancel:');
    expect(legalSource).not.toContain("footer: 'Ready Aim Digital · ABN 70 710 322 317 · Maclean, NSW'");
    expect(legalSource).toContain("What's yours, what's ours, and what happens if you leave");
    expect(documentSource).toContain('href={`#${section.id}`}');
    expect(documentSource).toContain('id={section.id}');
    expect(documentSource).toContain("page.eyebrow ?? 'Contract register'");
    expect(documentSource).toContain("Template notice:");
    expect(documentSource).toContain("page.showTemplateNotice !== false");
    expect(documentSource).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(documentSource).toContain("grid-template-rows:repeat(8,auto)");
    expect(documentSource).toContain("grid-auto-flow:column");
    expect(documentSource).not.toContain('>Placeholder text</Chip>');
    expect(documentSource).toContain("page.shortVersion.sections");
    expect(documentSource).toContain("section.highlights");
    expect(documentSource).toContain("noindex");
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

  it("renders the Terms and Privacy pages with the legal anchor structure", async () => {
    const { default: Terms } = await import("./pages/terms.astro");
    const { default: Privacy } = await import("./pages/privacy.astro");
    const container = await AstroContainer.create();
    const termsHtml = await container.renderToString(Terms, { request: requestUrl("/terms") });
    const privacyHtml = await container.renderToString(Privacy, { request: requestUrl("/privacy") });

    expect(termsHtml).toContain('id="guarantee"');
    expect(termsHtml).toContain('href="#guarantee"');
    expect(termsHtml).toContain('href="#getting"');
    expect(termsHtml).toContain("Our 90-day guarantee");
    expect(termsHtml).toContain("Last updated 17 Aug 2026");
    expect(termsHtml).not.toContain("Template notice:");
    expect(termsHtml).not.toContain("Placeholder text");
    expect(termsHtml).toContain("What&#39;s yours, what&#39;s ours, and what happens if you leave");
    expect(termsHtml).toContain("No exit fee.");
    expect(termsHtml).not.toContain("Ready Aim Digital · ABN 70 710 322 317 · Maclean, NSW");
    expect(privacyHtml).toContain('id="collect"');
    expect(privacyHtml).toContain('id="complaints"');
    expect(privacyHtml).toContain("Privacy policy");
    expect(privacyHtml).toContain('PRIVACY');
    expect(privacyHtml).toContain('Last updated 17 Aug 2026');
    expect(privacyHtml).toContain('Your contact details:');
    expect(privacyHtml).toContain('oaic.gov.au');
    expect(privacyHtml).toContain('Ready Aim Digital · ABN 70 710 322 317');
    expect(privacyHtml).not.toContain('Template notice:');
    expect(privacyHtml).not.toContain('Placeholder text');
  });

  it("keeps the free-demo confirmation hidden until the form succeeds", async () => {
    const { default: FreeDemo } = await import("./pages/free-demo.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(FreeDemo, { request: requestUrl("/free-demo") });
    const source = readFileSync("src/pages/free-demo.astro", "utf8");

    expect(html).toContain('id="demo-thanks" hidden');
    expect(source).toContain(".demo-thanks[hidden]{display:none}");
  });
});
