import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import { FORBIDDEN_PATTERNS } from "../../../scripts/leakage-lib.mjs";

const sectionsDir = fileURLToPath(new URL(".", import.meta.url));

const EXPECTED_SECTIONS = [
  "HeroSplit",
  "JumpLinkHero",
  "StorySplit",
  "PageIntro",
  "FeatureGrid",
  "ServiceBand",
  "ProcessTimeline",
  "ProcessRow",
  "GalleryMosaic",
  "FaqAccordion",
  "PricingBasisGrid",
  "ServiceAreaSplit",
  "ContactDetailsAside",
  "ContactSplit",
  "CtaBand",
];

const BRICKRITE_ONLY_PATTERNS = [
  /\bbrickrite\b/i,
  /\bshannon\b/i,
  /\byamba\b/i,
  /northern\s+rivers/i,
  /--terracotta-/i,
  /--charcoal-/i,
  /--teal-/i,
  /--surface-(paper|white|stone)\b/i,
  /--font-size-display-/i,
  /--shadow-card-hover\b/i,
  /--radius-(md|sm|full)\b/i,
  /--t-(fast|default)\b/i,
];

function readSectionSource(name: string): string {
  return readFileSync(join(sectionsDir, `${name}.astro`), "utf8");
}

function allLibraryFiles(): string[] {
  return readdirSync(sectionsDir).filter(
    (file) => file.endsWith(".astro") || file === "types.ts"
  );
}

describe("section library contract", () => {
  it("exposes every required neutral section file", () => {
    for (const name of EXPECTED_SECTIONS) {
      expect(() => readSectionSource(name)).not.toThrow();
    }
  });

  it("gives every section a typed, prop-driven Props interface", () => {
    for (const name of EXPECTED_SECTIONS) {
      const source = readSectionSource(name);
      expect(source, `${name}.astro should declare export interface Props`).toMatch(
        /export interface Props/
      );
    }
  });

  it("never imports client config directly from a section", () => {
    for (const name of EXPECTED_SECTIONS) {
      const source = readSectionSource(name);
      expect(source).not.toMatch(/from\s+["'][^"']*config\/content["']/);
      expect(source).not.toMatch(/from\s+["'][^"']*config\/site["']/);
      expect(source).not.toMatch(/from\s+["'][^"']*config\/brand["']/);
    }
  });

  it("contains no Brickrite-only naming, copy or tokens", () => {
    for (const file of allLibraryFiles()) {
      const source = readFileSync(join(sectionsDir, file), "utf8");
      for (const pattern of BRICKRITE_ONLY_PATTERNS) {
        expect(source, `${file} should not match ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it("contains no RAD or agency identity", () => {
    for (const file of allLibraryFiles()) {
      const source = readFileSync(join(sectionsDir, file), "utf8");
      for (const pattern of FORBIDDEN_PATTERNS) {
        expect(source, `${file} should not match ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it("uses design tokens for colours, type sizes and reusable spacing", () => {
    const rawColour = /#[0-9a-f]{3,8}\b|rgba?\(/i;
    const rawTypeSize = /font-size:\s*(?!var\(|inherit)[^;]*(?:rem|px)\b/i;
    const rawSpacing =
      /(?:margin(?:-(?:top|right|bottom|left))?|padding(?:-(?:top|right|bottom|left))?|gap|row-gap|column-gap):\s*[^;]*(?:rem|px)\b/i;
    const typographyDeclarations = /(?:line-height|letter-spacing):\s*([^;]+)/gi;
    const positionDeclarations = /(?:^|[;{]\s*)(?:top|right|bottom|left):\s*([^;]+)/gim;
    const dimensionDeclarations =
      /(?:^|[;{]\s*)(?:width|height|min-width|max-width|min-height|max-height|grid-template-columns):\s*([^;{}]+)/gim;

    for (const name of EXPECTED_SECTIONS) {
      const source = readSectionSource(name);
      const style = source.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
      expect(style, `${name}.astro should not hard-code colours`).not.toMatch(rawColour);
      expect(style, `${name}.astro should not hard-code type sizes`).not.toMatch(rawTypeSize);
      for (const [, value] of style.matchAll(typographyDeclarations)) {
        expect(value.trim(), `${name}.astro should tokenise typography metrics`).toMatch(
          /^(?:var\(|inherit$|normal$)/
        );
      }
      expect(style, `${name}.astro should not hard-code reusable spacing`).not.toMatch(rawSpacing);
      for (const [, value] of style.matchAll(dimensionDeclarations)) {
        const dimension = value.trim();
        if (/(?:rem|px)\b/i.test(dimension)) {
          expect(dimension, `${name}.astro should tokenise fixed dimensions`).toMatch(
            /(?:var|calc)\(/
          );
        }
      }
      for (const [, value] of style.matchAll(positionDeclarations)) {
        const position = value.trim();
        if (position !== "0" && position !== "auto") {
          expect(position, `${name}.astro should tokenise positional spacing`).toMatch(
            /^(?:var|calc)\(/
          );
        }
      }
    }
  });
});

describe("section library real render", () => {
  it("renders CtaBand from typed props alone", async () => {
    const { default: CtaBand } = await import("./CtaBand.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(CtaBand, {
      props: { heading: "Ready to get started?", ctaLabel: "Book now", href: "/contact" },
    });

    expect(html).toContain("Ready to get started?");
    expect(html).toContain("Book now");
    expect(html).toContain('href="/contact"');
  });

  it("renders PageIntro from typed props alone", async () => {
    const { default: PageIntro } = await import("./PageIntro.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(PageIntro, {
      props: { eyebrow: "About", heading: "Our story", lead: "A short lead paragraph." },
    });

    expect(html).toContain("Our story");
    expect(html).toContain("A short lead paragraph.");
  });

  it("renders PageIntro notice copy entirely from props", async () => {
    const { default: PageIntro } = await import("./PageIntro.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(PageIntro, {
      props: {
        heading: "Important information",
        lead: "Please review this page.",
        noticeLabel: "Template notice:",
        notice: "Replace this content before launch.",
      },
    });

    expect(html).toContain("Template notice:");
    expect(html).not.toContain("Heads up.");
  });

  it("renders FeatureGrid from a typed items array", async () => {
    const { default: FeatureGrid } = await import("./FeatureGrid.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(FeatureGrid, {
      props: {
        heading: "Why choose us",
        items: [
          { title: "Reliable", body: "We show up on time." },
          { title: "Local", body: "Based in your area." },
        ],
      },
    });

    expect(html).toContain("Why choose us");
    expect(html).toContain("Reliable");
    expect(html).toContain("Local");
  });

  it("renders FaqAccordion from a typed items array", async () => {
    const { default: FaqAccordion } = await import("./FaqAccordion.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(FaqAccordion, {
      props: {
        items: [{ question: "Do you offer free quotes?", answer: "Yes, always." }],
      },
    });

    expect(html).toContain("Do you offer free quotes?");
    expect(html).toContain("Yes, always.");
  });

  it("renders HeroSplit from typed props alone", async () => {
    const { default: HeroSplit } = await import("./HeroSplit.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(HeroSplit, {
      props: {
        heading: "Neutral headline",
        lead: "Neutral supporting lead copy.",
        image: { src: "/images/placeholder-hero.jpg", alt: "Placeholder" },
      },
    });

    expect(html).toContain("Neutral headline");
    expect(html).toContain("Neutral supporting lead copy.");
  });

  it("renders every supplied GalleryMosaic image", async () => {
    const { default: GalleryMosaic } = await import("./GalleryMosaic.astro");
    const container = await AstroContainer.create();
    const images = Array.from({ length: 9 }, (_, index) => ({
      src: `/images/gallery-${index + 1}.jpg`,
      alt: `Gallery image ${index + 1}`,
    }));
    const html = await container.renderToString(GalleryMosaic, {
      props: { heading: "Project gallery", images },
    });

    for (const image of images) expect(html).toContain(image.src);
  });

  it("uses the shared Button primitive in CtaBand", () => {
    expect(readSectionSource("CtaBand")).toContain('import Button from "../ui/Button.astro"');
  });
});
