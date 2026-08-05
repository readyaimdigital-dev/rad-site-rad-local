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
  name: "RAD Local",
  legalName: "Ready Aim Digital",
  tagline: "A better website, without the technical headache",
  description:
    "RAD Local builds and supports websites for regional Australian businesses.",
  url: "https://radlocal.readyaim.digital",
  locale: "en-AU",
  contact: {
    email: "hello@readyaim.digital",
    phone: "+61 2 5632 9005",
  },
  address: {
    street: "",
    suburb: "Maclean",
    state: "NSW",
    postcode: "2463",
    country: "AU",
  },
  serviceArea: ["Yamba", "Maclean", "Grafton", "Iluka"],
  openingHours: [],
  social: {
    facebook: "https://www.facebook.com/readyaimdigital",
    instagram: "https://www.instagram.com/readyaimdigital",
  },
  images: {
    logo: "/images/placeholder.svg",
    favicon: "/favicon.svg",
    ogDefault: "/images/og-default.svg",
  },
  seo: {
    defaultTitle: "RAD Local | Websites for regional Australian businesses",
    titleTemplate: "%s | RAD Local",
    defaultDescription:
      "Websites for regional Australian businesses, with ongoing support from Ready Aim Digital.",
  },
};
