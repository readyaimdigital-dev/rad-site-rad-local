const NOINDEX_PATHS = new Set(["/privacy/", "/terms/"]);

export function shouldIncludeInSitemap(pageUrl: string): boolean {
  return !NOINDEX_PATHS.has(new URL(pageUrl).pathname);
}
