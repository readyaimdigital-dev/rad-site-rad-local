#!/usr/bin/env node
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { filterExportPaths, sanitisePackageManifest } from "./export-client-lib.mjs";
import { findForbiddenReferences } from "./leakage-lib.mjs";

const root = process.cwd();
const requestedName = process.argv[2] ?? "client-site-source";
const archiveName = requestedName.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
if (!archiveName) throw new Error("Provide an archive name containing letters or numbers.");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: null,
    maxBuffer: 100 * 1024 * 1024,
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${command} failed: ${(result.stderr || result.stdout).toString("utf8")}`);
  }
  return result.stdout;
}

function readIndexedFile(path) {
  return run("git", ["show", `:${path}`]);
}

const manifest = readIndexedFile(".exportignore").toString("utf8");
const indexedPaths = run("git", ["ls-files", "--cached", "-z"])
  .toString("utf8")
  .split("\0")
  .filter(Boolean);
const exportPaths = filterExportPaths(indexedPaths, manifest).sort();
if (exportPaths.length === 0) throw new Error("The Git index contains no exportable files.");

const indexedFiles = new Map(exportPaths.map((path) => [path, readIndexedFile(path)]));
const sourceRecords = exportPaths.map((path) => ({
  path,
  text: indexedFiles.get(path).toString("utf8"),
}));
const sourceFindings = findForbiddenReferences(sourceRecords);
if (sourceFindings.length > 0) {
  for (const finding of sourceFindings) {
    console.error(`Export leakage in indexed source ${finding.path}: ${finding.pattern}`);
  }
  process.exit(1);
}

const stagingRoot = await mkdtemp(join(tmpdir(), "client-source-export-"));
const verificationRoot = await mkdtemp(join(tmpdir(), "client-source-verify-"));
const outputPath = resolve("exports", `${archiveName}.zip`);
try {
  for (const path of exportPaths) {
    const destination = join(stagingRoot, path);
    await mkdir(dirname(destination), { recursive: true });
    let content = indexedFiles.get(path);
    if (path === "package.json") {
      const packageJson = JSON.parse(content.toString("utf8"));
      content = Buffer.from(`${JSON.stringify(sanitisePackageManifest(packageJson), null, 2)}\n`);
    }
    await writeFile(destination, content);
  }

  await mkdir(dirname(outputPath), { recursive: true });
  const createArchive = `
import pathlib, sys, zipfile
root = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(root.rglob("*")):
        if path.is_file():
            archive.write(path, path.relative_to(root))
`;
  run("python3", ["-c", createArchive, stagingRoot, outputPath]);

  const inspectArchive = `
import json, pathlib, sys, zipfile
archive_path = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
with zipfile.ZipFile(archive_path) as archive:
    names = archive.namelist()
    archive.extractall(out)
print(json.dumps(names))
`;
  const archivePaths = JSON.parse(
    run("python3", ["-c", inspectArchive, outputPath, verificationRoot], { encoding: "utf8" })
  );
  if (JSON.stringify(archivePaths.slice().sort()) !== JSON.stringify(exportPaths)) {
    throw new Error("Finished archive entries do not match the filtered Git index.");
  }

  const archiveRecords = await Promise.all(
    archivePaths.map(async (path) => ({
      path,
      text: (await readFile(join(verificationRoot, path))).toString("utf8"),
    }))
  );
  const archiveFindings = findForbiddenReferences(archiveRecords);
  if (archiveFindings.length > 0) {
    for (const finding of archiveFindings) {
      console.error(`Export leakage in finished archive ${finding.path}: ${finding.pattern}`);
    }
    await rm(outputPath, { force: true });
    process.exit(1);
  }

  const archiveStat = await stat(outputPath);
  console.log(`Client source export created: ${outputPath}`);
  console.log(`Included indexed files: ${exportPaths.length}`);
  console.log("Finished archive leakage findings: 0");
  console.log(`Archive bytes: ${archiveStat.size}`);
} finally {
  await rm(stagingRoot, { recursive: true, force: true });
  await rm(verificationRoot, { recursive: true, force: true });
}
