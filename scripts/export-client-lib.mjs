import { matchesGlob } from "node:path";

function parseManifest(manifest) {
  return manifest
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function matchesRule(path, pattern) {
  const normalisedPattern = pattern.replace(/^\//, "").replace(/\/$/, "");
  if (!/[?*[]/.test(normalisedPattern)) {
    return path === normalisedPattern || path.startsWith(`${normalisedPattern}/`);
  }
  return matchesGlob(path, normalisedPattern);
}

export function shouldExcludeExportPath(path, manifest) {
  let excluded = false;
  for (const rule of parseManifest(manifest)) {
    const negated = rule.startsWith("!");
    const pattern = negated ? rule.slice(1) : rule;
    if (matchesRule(path, pattern)) excluded = !negated;
  }
  return excluded;
}

export function filterExportPaths(paths, manifest) {
  return paths.filter((path) => !shouldExcludeExportPath(path, manifest));
}

export function sanitisePackageManifest(packageJson) {
  const blockedScripts = new Set(["test", "check:leakage", "export:client"]);
  return {
    ...packageJson,
    scripts: Object.fromEntries(
      Object.entries(packageJson.scripts ?? {}).filter(
        ([name]) => !blockedScripts.has(name) && !name.startsWith("test:")
      )
    ),
  };
}
