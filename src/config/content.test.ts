import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { content } from "./content";
import { site } from "./site";

describe("client-editable content", () => {
  it("uses one service catalogue for home and services pages", () => {
    const serviceIds = content.services.map((service) => service.id);

    expect(new Set(serviceIds).size).toBe(serviceIds.length);
    expect(content.home.featuredServiceIds.length).toBeGreaterThan(0);
    for (const id of content.home.featuredServiceIds) {
      expect(serviceIds).toContain(id);
    }
  });

  it("keeps editable page narrative in the content layer", () => {
    expect(content.home.hero.heading).toBeTruthy();
    expect(content.about.paragraphs.length).toBeGreaterThan(0);
    expect(content.contact.intro).toBeTruthy();
    expect(content.home.serviceAreaSuffix).toBeTruthy();
    expect(content.servicesPage.description).toBeTruthy();
    expect(content.contact.description).toBeTruthy();
    expect(content.privacy.sections.length).toBeGreaterThan(0);
    expect(content.terms.sections.length).toBeGreaterThan(0);

    const homeSource = readFileSync("src/pages/index.astro", "utf8");
    const servicesSource = readFileSync("src/pages/services.astro", "utf8");
    const contactSource = readFileSync("src/pages/contact.astro", "utf8");
    const privacySource = readFileSync("src/pages/privacy.astro", "utf8");
    const termsSource = readFileSync("src/pages/terms.astro", "utf8");
    expect(homeSource).toContain("rad-local-design-content");
    expect(servicesSource).toContain("content.servicesPage.description");
    expect(contactSource).toContain("content.contact.description");
    expect(privacySource).toContain("RadLocalDesignLayout.astro");
    expect(termsSource).toContain("content.terms.sections");
    expect(privacySource).not.toContain("[Business Legal Name]");
    expect(termsSource).not.toContain("[Business Legal Name]");
  });

  it("keeps business identity out of reusable public brand assets", () => {
    for (const asset of [
      "public/favicon.svg",
      "public/images/logo.svg",
      "public/images/og-default.svg",
    ]) {
      const source = readFileSync(asset, "utf8");
      expect(source).not.toContain(site.name);
      expect(source).not.toContain(site.legalName);
      expect(source).not.toContain("Two Rivers");
      expect(source).not.toContain(">T<");
    }
  });

  it("only references public image assets that exist", () => {
    const serialized = JSON.stringify(content);
    const imagePaths = [...serialized.matchAll(/"src":"(\/images\/[^"]+)"/g)].map(
      ([, src]) => src
    );

    expect(imagePaths.length).toBeGreaterThan(0);
    for (const src of imagePaths) {
      expect(existsSync(`public${src}`), `${src} should exist under public/`).toBe(true);
    }
  });

  it("marks the abstract placeholder image as decorative", () => {
    const images: Array<{ src: string; alt?: string }> = [];
    const visit = (value: unknown): void => {
      if (!value || typeof value !== "object") return;
      if ("src" in value && typeof value.src === "string") {
        images.push(value as { src: string; alt?: string });
      }
      for (const child of Object.values(value)) visit(child);
    };
    visit(content);

    const placeholders = images.filter((image) => image.src === "/images/placeholder.svg");
    expect(placeholders.length).toBeGreaterThan(0);
    for (const image of placeholders) expect(image.alt).toBe("");
  });

  it("derives service-area coverage from site configuration", () => {
    const source = readFileSync("src/config/content.ts", "utf8");
    expect(source).toContain("site.serviceArea.length");
    expect(source).not.toContain('{ k: "Coverage", v: "5 suburbs" }');
  });
});
