export type BuildType = "direct" | "whitelabel";

export interface Attribution {
  label: string;
  url: string;
}

export interface BrandConfig {
  buildType: BuildType;
  attribution: Attribution;
}

interface BrandEnvironment {
  [key: string]: unknown;
  PUBLIC_BUILD_TYPE?: unknown;
  PUBLIC_ATTRIBUTION_LABEL?: unknown;
  PUBLIC_ATTRIBUTION_URL?: unknown;
}

const WHITELABEL_BRAND: BrandConfig = {
  buildType: "whitelabel",
  attribution: { label: "", url: "" },
};

function isSafeAttributionUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Resolves a static build-time attribution configuration. The fail-safe default
 * is always whitelabel, including when direct-build inputs are incomplete.
 */
export function createBrandConfig(environment: BrandEnvironment): BrandConfig {
  const label =
    typeof environment.PUBLIC_ATTRIBUTION_LABEL === "string"
      ? environment.PUBLIC_ATTRIBUTION_LABEL.trim()
      : "";
  const url =
    typeof environment.PUBLIC_ATTRIBUTION_URL === "string"
      ? environment.PUBLIC_ATTRIBUTION_URL.trim()
      : "";

  if (
    environment.PUBLIC_BUILD_TYPE === "direct" &&
    label.length > 0 &&
    isSafeAttributionUrl(url)
  ) {
    return { buildType: "direct", attribution: { label, url } };
  }

  return WHITELABEL_BRAND;
}

export const brand = createBrandConfig(import.meta.env);

export function getFooterAttribution(config: BrandConfig = brand): Attribution | null {
  return config.buildType === "direct" ? config.attribution : null;
}
