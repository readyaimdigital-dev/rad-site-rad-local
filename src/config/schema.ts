import { site, type SiteConfig } from "./site";

/**
 * Generates LocalBusiness JSON-LD from site.ts. Business-data only:
 * agency identity is never referenced here, regardless of build type.
 */
export function buildLocalBusinessSchema(config: SiteConfig = site) {
  const sameAs = Object.values(config.social).filter(
    (value): value is string => Boolean(value)
  );

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.name,
    legalName: config.legalName,
    description: config.description,
    url: config.url,
    telephone: config.contact.phone,
    email: config.contact.email,
    image: `${config.url}${config.images.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.suburb,
      addressRegion: config.address.state,
      postalCode: config.address.postcode,
      addressCountry: config.address.country,
    },
    ...(config.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: config.geo.lat,
            longitude: config.geo.lng,
          },
        }
      : {}),
    areaServed: config.serviceArea,
    openingHoursSpecification: config.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * Serialises JSON-LD without allowing client-provided text to close the
 * surrounding script element. Escaping `<` is JSON-safe and prevents the
 * HTML parser from recognising a `</script>` sequence.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
