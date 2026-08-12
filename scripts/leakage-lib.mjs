import { extname, join, relative } from "node:path";
import { readdir, readFile } from "node:fs/promises";

export const FORBIDDEN_PATTERNS = [
  /ready[\s._-]*aim[\s._-]*digital/i,
  /readyaim\.digital/i,
  /built\s+by\s+rad\b/i,
  /powered\s+by\s+rad\b/i,
  /\bRAD\b/,
];

const TEXT_EXTENSIONS = new Set([
  ".css",
  ".cjs",
  ".html",
  ".js",
  ".json",
  ".map",
  ".mjs",
  ".svg",
  ".txt",
  ".xml",
]);

const RAD_LOCAL_IDENTITY_PATTERNS = new Set([
  /ready[\s._-]*aim[\s._-]*digital/i.toString(),
  /readyaim\.digital/i.toString(),
  /\bRAD\b/.toString(),
]);

export function findForbiddenReferences(records, options = {}) {
  const patterns = options.allowRadLocalIdentity
    ? FORBIDDEN_PATTERNS.filter((pattern) => !RAD_LOCAL_IDENTITY_PATTERNS.has(pattern.toString()))
    : FORBIDDEN_PATTERNS;
  const findings = [];
  for (const record of records) {
    const searchable = `${record.path}\n${record.text}`;
    for (const pattern of patterns) {
      if (pattern.test(searchable)) {
        findings.push({ path: record.path, pattern: pattern.toString() });
      }
    }
  }
  return findings;
}

async function collectTextRecords(root, directory = root) {
  const records = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      records.push(...(await collectTextRecords(root, fullPath)));
    } else if (TEXT_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      records.push({ path: relative(root, fullPath), text: await readFile(fullPath, "utf8") });
    }
  }
  return records;
}

export async function scanTextRoots(roots, options = {}) {
  const records = [];
  for (const root of roots) {
    const rootRecords = await collectTextRecords(root);
    records.push(
      ...rootRecords.map((record) => ({
        path: `${root}/${record.path}`,
        text: record.text,
      }))
    );
  }
  return { records, findings: findForbiddenReferences(records, options) };
}
