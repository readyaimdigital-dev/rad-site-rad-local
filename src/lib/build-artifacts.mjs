import { copyFile } from "node:fs/promises";
import { join } from "node:path";

export async function ensureSitemapAlias(directory) {
  await copyFile(
    join(directory, "sitemap-index.xml"),
    join(directory, "sitemap.xml")
  );
}
