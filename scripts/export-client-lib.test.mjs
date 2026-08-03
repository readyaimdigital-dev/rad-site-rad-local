import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";
import {
  filterExportPaths,
  sanitisePackageManifest,
  shouldExcludeExportPath,
} from "./export-client-lib.mjs";

const manifest = `
.git
scripts
vitest.config.ts
**/*.test.*
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
      "src/lib/build-artifacts.test.mjs",
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

  it("keeps local build helpers imported by astro.config.mjs in client exports", () => {
    const exportManifest = readFileSync(new URL("../.exportignore", import.meta.url), "utf8");
    const astroConfig = readFileSync(new URL("../astro.config.mjs", import.meta.url), "utf8");
    const helperImport = astroConfig.match(/from "(\.\/[^"\n]*build-artifacts\.mjs)"/);

    expect(helperImport, "astro.config.mjs should import the sitemap build helper").not.toBeNull();
    const helperPath = helperImport[1].replace(/^\.\//, "");
    expect(shouldExcludeExportPath(helperPath, exportManifest)).toBe(false);
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
