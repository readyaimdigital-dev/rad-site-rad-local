#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { scanTextRoots } from "./leakage-lib.mjs";

const requestedRoots = process.argv.slice(2).map((path) => resolve(path));
const defaultRoot = existsSync(resolve(".vercel/output")) ? resolve(".vercel/output") : resolve("dist");
const roots = requestedRoots.length > 0 ? requestedRoots : [defaultRoot];
const missingRoots = roots.filter((root) => !existsSync(root));

if (missingRoots.length > 0) {
  for (const root of missingRoots) console.error(`No output found at ${root}.`);
  console.error('Run "pnpm build" first.');
  process.exit(1);
}

const { records, findings } = await scanTextRoots(roots);

if (findings.length > 0) {
  for (const finding of findings) {
    console.error(`Leakage found in ${finding.path}: matched ${finding.pattern}`);
  }
  console.error(`\nLeakage scan FAILED: ${findings.length} match(es) across ${records.length} text file(s).`);
  process.exit(1);
}

console.log(`Leakage scan passed: 0 matches across ${records.length} text file(s).`);
