import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const tokensCss = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");
const globalCss = readFileSync(fileURLToPath(new URL("./global.css", import.meta.url)), "utf8");
const heroSplitSection = readFileSync(
  fileURLToPath(new URL("../components/sections/HeroSplit.astro", import.meta.url)),
  "utf8"
);

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function relativeLuminance(hex: string): number {
  const channels = hexToRgb(hex).map((channel) => {
    const normalised = channel / 255;
    return normalised <= 0.04045
      ? normalised / 12.92
      : ((normalised + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a
  );
  return (lighter + 0.05) / (darker + 0.05);
}

describe("typography token contract", () => {
  it("defines one responsive type scale and maps it into Tailwind theme aliases", () => {
    for (const token of ["body", "lead", "h4", "h3", "h2", "h1"]) {
      expect(tokensCss).toContain(`--type-${token}-size:`);
      expect(tokensCss).toContain(`--text-brand-${token}: var(--type-${token}-size);`);
    }

    expect(tokensCss).toContain(
      "--text-brand-h1--line-height: var(--type-heading-line-height);"
    );
    expect(tokensCss).toContain(
      "--text-brand-h1--letter-spacing: var(--type-heading-letter-spacing);"
    );
  });

  it("restores semantic heading sizes after Tailwind preflight", () => {
    expect(globalCss).toMatch(/h1\s*\{[^}]*font-size:\s*var\(--type-h1-size\)/s);
    expect(globalCss).toMatch(/h2\s*\{[^}]*font-size:\s*var\(--type-h2-size\)/s);
    expect(globalCss).toMatch(/h3\s*\{[^}]*font-size:\s*var\(--type-h3-size\)/s);
    expect(globalCss).toMatch(/h4\s*\{[^}]*font-size:\s*var\(--type-h4-size\)/s);
  });

  it("uses the lead token instead of a component-local font size", () => {
    expect(globalCss).toMatch(/\.text-lead\s*\{[^}]*font-size:\s*var\(--type-lead-size\)/s);
    expect(heroSplitSection).toContain('class="text-muted text-lead hero-split__lead"');
    expect(heroSplitSection).not.toMatch(/\.hero-split__lead\s*\{[^}]*font-size:/s);
  });

  it("keeps accent text and buttons at WCAG AA contrast", () => {
    const token = (name: string) =>
      tokensCss.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1] ?? "";
    const accent = token("--color-accent");
    const background = token("--color-bg");
    const onAccent = token("--color-on-accent");

    expect(accent).toBeTruthy();
    expect(contrastRatio(accent, background)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(onAccent, accent)).toBeGreaterThanOrEqual(4.5);
  });
});
