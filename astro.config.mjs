import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { site } from "./src/config/site.ts";
import { shouldIncludeInSitemap } from "./src/config/sitemap.ts";

const GENERATOR_TAG_PATTERN = /<meta\s+name="generator"[^>]*>\s*/gi;

async function stripGeneratorMetaFromHtml(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await stripGeneratorMetaFromHtml(fullPath);
    } else if (extname(entry.name) === ".html") {
      const html = await readFile(fullPath, "utf8");
      await writeFile(fullPath, html.replace(GENERATOR_TAG_PATTERN, ""), "utf8");
    }
  }
}

const stripGeneratorMeta = () => ({
  name: "strip-generator-meta",
  hooks: {
    "astro:build:done": async ({ dir }) => stripGeneratorMetaFromHtml(new URL(dir).pathname),
  },
});

export default defineConfig({
  site: site.url,
  output: "static",
  adapter: vercel(),
  integrations: [sitemap({ filter: shouldIncludeInSitemap }), stripGeneratorMeta()],
  vite: {
    plugins: [tailwindcss()],
  },
});
