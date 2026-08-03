import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const tokensCss = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");
const globalCss = readFileSync(fileURLToPath(new URL("./global.css", import.meta.url)), "utf8");
const homePage = readFileSync(
  fileURLToPath(new URL("../pages/index.astro", import.meta.url)),
  "utf8"
);

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

  it("uses the lead token instead of a page-local font size", () => {
    expect(globalCss).toMatch(/\.text-lead\s*\{[^}]*font-size:\s*var\(--type-lead-size\)/s);
    expect(homePage).toContain('class="text-muted text-lead hero__lead"');
    expect(homePage).not.toMatch(/\.hero__lead\s*\{[^}]*font-size:/s);
  });
});
