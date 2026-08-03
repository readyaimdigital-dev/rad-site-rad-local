import { describe, expect, it } from "vitest";
import { brand, createBrandConfig, getFooterAttribution, type BrandConfig } from "./brand";

describe("brand config", () => {
  it("defaults to whitelabel", () => {
    expect(brand.buildType).toBe("whitelabel");
  });

  it("returns no attribution for whitelabel builds", () => {
    const whitelabel: BrandConfig = { ...brand, buildType: "whitelabel" };
    expect(getFooterAttribution(whitelabel)).toBeNull();
  });

  it("returns the configured attribution for direct builds", () => {
    const direct = createBrandConfig({
      PUBLIC_BUILD_TYPE: "direct",
      PUBLIC_ATTRIBUTION_LABEL: "Example Agency",
      PUBLIC_ATTRIBUTION_URL: "https://agency.example",
    });
    expect(getFooterAttribution(direct)).toEqual({
      label: "Example Agency",
      url: "https://agency.example",
    });
  });

  it("fails safe to whitelabel when direct attribution is incomplete or unsafe", () => {
    expect(createBrandConfig({ PUBLIC_BUILD_TYPE: "direct" })).toEqual({
      buildType: "whitelabel",
      attribution: { label: "", url: "" },
    });
    expect(
      createBrandConfig({
        PUBLIC_BUILD_TYPE: "direct",
        PUBLIC_ATTRIBUTION_LABEL: "Example Agency",
        PUBLIC_ATTRIBUTION_URL: "javascript:alert(1)",
      })
    ).toEqual({
      buildType: "whitelabel",
      attribution: { label: "", url: "" },
    });
  });
});
