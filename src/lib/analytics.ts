const GA4_MEASUREMENT_ID = /^G-[A-Z0-9]+$/;

export function normaliseGa4Id(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return GA4_MEASUREMENT_ID.test(trimmed) ? trimmed : null;
}

export function buildGa4InlineScript(id: string): string {
  const serialisedId = JSON.stringify(id);
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", ${serialisedId});`;
}
