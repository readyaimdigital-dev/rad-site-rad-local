/**
 * Verified business facts.
 *
 * Source: rad-local-design-handoff/04-style-guide/11-demo-flow-and-assets.md Part 4.
 * Every value here was confirmed by Hayden on 2026-08-12. Nothing is inferred.
 */

export const site = {
  name: 'RAD Local',
  parent: 'Ready Aim Digital',
  abn: '70 710 322 317',

  /** Public phone. 02 is the NSW/ACT area code, consistent with Maclean. */
  phone: {
    display: '(02) 5632 9005',
    href: 'tel:+61256329005',
  },

  /**
   * Two addresses, two jobs. Do not conflate them.
   * `general` is the public footer address; `form` receives demo requests and
   * is the failure-notice fallback.
   */
  email: {
    general: 'hello@readyaim.digital',
    form: 'support@readyaim.digital',
  },

  operator: { name: 'Hayden', location: 'Maclean, NSW' },

  /** Prices are ex GST throughout. */
  gst: 'exclusive' as const,
  currency: 'AUD',
} as const;

export const routes = {
  home: '/',
  about: '/about',
  freeDemo: '/free-demo',
  terms: '/terms',
  privacy: '/privacy',
  guaranteeTerms: '/terms#guarantee',
} as const;

/**
 * Legal pages remain visible placeholders until their wording is reviewed and
 * populated with final, client-specific legal content.
 */
export const maintenance = {
  privacy: true,
  guaranteeTerms: true,
} as const;

export const nav = [
  { label: 'How it works', href: '/#how' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: routes.about },
] as const;

/** Page-level behaviour flags that survived from the export's editor props. */
export const flags = {
  stickyCtaBar: true,
  faqFirstOpen: false,
} as const;

/**
 * The demo request endpoint. The booking link is emailed AND shown on the
 * confirmation screen, so a failed send never strands the enquirer.
 * Lead time is enforced by the scheduler; vendor to be configured.
 */
export const demoRequest = {
  endpoint: '/api/contact',
  notify: site.email.form,
  bookingUrl: import.meta.env.PUBLIC_BOOKING_URL ?? '',
} as const;
