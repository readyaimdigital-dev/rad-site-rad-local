/**
 * Single source of truth for this client's business details.
 * Every page, SEO tag and schema block reads from this file.
 * Do not duplicate these facts anywhere else in the codebase.
 */

export interface OpeningHours {
  /** Full weekday names, e.g. ["Monday", "Tuesday"] */
  days: string[];
  /** 24-hour time, e.g. "08:00" */
  opens: string;
  /** 24-hour time, e.g. "17:00" */
  closes: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface PostalAddress {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  /** ISO 3166-1 alpha-2 country code, e.g. "AU" */
  country: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  google?: string;
}

export interface SiteImages {
  logo: string;
  favicon: string;
  ogDefault: string;
}

export interface SiteSeo {
  defaultTitle: string;
  /** Use "%s" as the page-title placeholder, e.g. "%s | Business Name" */
  titleTemplate: string;
  defaultDescription: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  /** Canonical production URL, no trailing slash */
  url: string;
  /** BCP 47 locale, e.g. "en-AU" */
  locale: string;
  contact: {
    email: string;
    phone: string;
  };
  address: PostalAddress;
  geo?: GeoCoordinates;
  serviceArea: string[];
  openingHours: OpeningHours[];
  social: SocialLinks;
  images: SiteImages;
  seo: SiteSeo;
}

export const site: SiteConfig = {
  name: "Two Rivers Plumbing & Gas",
  legalName: "Two Rivers Plumbing & Gas Pty Ltd",
  tagline: "Local plumbers you can rely on",
  description:
    "Two Rivers Plumbing & Gas provides residential and commercial plumbing, gas fitting and emergency repairs across the Riverina region.",
  url: "https://example.com.au",
  locale: "en-AU",
  contact: {
    email: "hello@example.com.au",
    phone: "+61 2 5550 1234",
  },
  address: {
    street: "12 Wattle Street",
    suburb: "Wagga Wagga",
    state: "NSW",
    postcode: "2650",
    country: "AU",
  },
  geo: {
    lat: -35.1082,
    lng: 147.3598,
  },
  serviceArea: ["Wagga Wagga", "Junee", "Coolamon", "Ladysmith", "The Rock"],
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    {
      days: ["Saturday"],
      opens: "08:00",
      closes: "12:00",
    },
  ],
  social: {
    facebook: "https://facebook.com/example",
    instagram: "https://instagram.com/example",
  },
  images: {
    logo: "/images/logo.svg",
    favicon: "/favicon.svg",
    ogDefault: "/images/og-default.svg",
  },
  seo: {
    defaultTitle: "Two Rivers Plumbing & Gas | Wagga Wagga Plumbers",
    titleTemplate: "%s | Two Rivers Plumbing & Gas",
    defaultDescription:
      "Trusted local plumbers serving Wagga Wagga and the Riverina. Residential and commercial plumbing, gas fitting and emergency callouts.",
  },
};
