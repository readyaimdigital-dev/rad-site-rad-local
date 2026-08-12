import { describe, expect, it } from "vitest";
import { findForbiddenReferences } from "./leakage-lib.mjs";

describe("full-output leakage detection", () => {
  it.each([
    ["index.html", "Powered by RAD"],
    ["logo.svg", "Ready Aim Digital"],
    ["sitemap.xml", "https://readyaim.digital"],
    ["config.json", '{"agency":"Ready Aim Digital"}'],
    ["server.mjs", "const credit = 'Built by RAD'"],
    ["schema.ts", "Agency marker: RAD"],
  ])("detects forbidden identity in %s", (path, text) => {
    expect(findForbiddenReferences([{ path, text }]).length).toBeGreaterThan(0);
  });

  it("passes neutral output", () => {
    expect(findForbiddenReferences([{ path: "index.html", text: "Local business website" }])).toEqual([]);
  });

  it("allows declared RAD Local identity only in the product profile", () => {
    const records = [{
      path: "index.html",
      text: "RAD Local is a Ready Aim Digital company. Contact hello@readyaim.digital.",
    }];

    expect(findForbiddenReferences(records)).not.toEqual([]);
    expect(findForbiddenReferences(records, { allowRadLocalIdentity: true })).toEqual([]);
    expect(
      findForbiddenReferences([{ path: "index.html", text: "Powered by RAD" }], {
        allowRadLocalIdentity: true,
      }),
    ).not.toEqual([]);
  });

  it("detects forbidden identity in a filename", () => {
    expect(
      findForbiddenReferences([
        { path: "ready-aim-digital-note.txt", text: "Neutral file content" },
      ])
    ).toHaveLength(1);
  });
});
