import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { ensureSitemapAlias } from "../src/lib/build-artifacts.mjs";

describe("build artifact aliases", () => {
  it("copies the generated sitemap index to sitemap.xml byte for byte", async () => {
    const directory = await mkdtemp(join(tmpdir(), "rad-local-sitemap-"));
    const sitemap = "<?xml version=\"1.0\"?><sitemapindex><sitemap /></sitemapindex>";

    try {
      await writeFile(join(directory, "sitemap-index.xml"), sitemap, "utf8");
      await ensureSitemapAlias(directory);

      expect(await readFile(join(directory, "sitemap.xml"), "utf8")).toBe(sitemap);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
