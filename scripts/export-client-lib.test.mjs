import { describe, expect, it } from "vitest";
import { filterExportPaths, sanitisePackageManifest } from "./export-client-lib.mjs";

const manifest = `
.git
scripts
vitest.config.ts
**/*.test.ts
docs/internal
.env*
!.env.example
node_modules
`;

describe("client export filtering", () => {
  it("excludes internal tooling, tests, secrets and internal documents", () => {
    const candidates = [
      "src/pages/index.astro",
      "src/config/brand.test.ts",
      "scripts/check-no-rad-leakage.mjs",
      "vitest.config.ts",
      "docs/internal/decisions.md",
      ".env.local",
      ".env.example",
      "node_modules/pkg/index.js",
    ];

    expect(filterExportPaths(candidates, manifest)).toEqual([
      "src/pages/index.astro",
      ".env.example",
    ]);
  });

  it("removes scripts whose implementation is excluded from the archive", () => {
    const packageJson = {
      scripts: {
        dev: "astro dev",
        build: "astro build",
        check: "astro check",
        test: "vitest run",
        "test:watch": "vitest",
        "check:leakage": "node scripts/check-no-rad-leakage.mjs",
        "export:client": "node scripts/export-client.mjs",
      },
    };

    expect(sanitisePackageManifest(packageJson).scripts).toEqual({
      dev: "astro dev",
      build: "astro build",
      check: "astro check",
    });
  });
});
