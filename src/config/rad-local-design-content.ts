import earthworks from '../assets/rad-sample-earthworks.jpg';
import vet from '../assets/rad-sample-vet.jpg';
import solar from '../assets/rad-sample-solar.jpg';
import bakery from '../assets/rad-sample-bakery.jpg';
import haydenPhoto from '../assets/hayden.jpg';
import townPhoto from '../assets/hero-town.jpg';

/**
 * Approved narrative.
 *
 * SOURCE OF TRUTH: rad-local-design-handoff/04-style-guide/07-approved-decisions.md
 * NOT the Design Canvas export, which still carries the superseded
 * $299 build / $139 a month pricing in 15 places.
 *
 * Voice rules that shaped the shapes below (design-system readme):
 *   - Short sentences. Real numbers. Direct address.
 *   - Sentence case everywhere, including headlines and buttons.
 *   - Australian English. Em dashes are a defect. Emoji never.
 * Paragraph groups are arrays of short lines on purpose. Collapsing them into
 * flowing prose would change the brand read.
 */

/* ── pricing · 07 §1 and §1b ─────────────────────────────────────────────── */

export const pricing = {
  buildFee: { amount: '599', caption: 'one-off build' },
  anchor:
    "One one-off build fee on every plan. That's everything it takes to get you designed, built and live. Then choose the monthly plan that fits.",
  footnote: 'All prices ex GST.',
  closingNote:
    "Most businesses land on Momentum. It's the plan where the monthly work actually happens, and where you get a report proving it did.",
  baseline:
    "Every plan includes all of this: your site, an enquiry form straight to your inbox, hosting, SSL, security, backups, Google Business Profile, schema, a build that's ready for AI search, and a monthly snapshot.",
  tiers: [
    {
      name: 'Presence',
      price: '199',
      outcome: "You're live, you look the part, and you're built to be found.",
      lines: [
        'A 1 to 3 page site, fully built',
        'A monthly snapshot of where you’re showing up',
        'One change a month: text, photos, hours, pricing',
      ],
      bestFor: 'I need to look legitimate and get found.',
      popular: false,
    },
    {
      name: 'Momentum',
      price: '399',
      outcome:
        'Real work every month to keep you visible, and a report that proves it happened.',
      lines: [
        'A 4 to 6 page site, fully built',
        { lead: true, text: 'Everything in Presence, plus:' },
        'Monthly search and AI-answer optimisation',
        'A full plain-English monthly report',
        'Three changes a month: text, photos, hours, pricing',
      ],
      bestFor: "I want to keep showing up, and I want to see that it's working.",
      popular: true,
      popularLabel: 'Most businesses land here',
    },
    {
      name: 'Frontrunner',
      price: '899',
      outcome:
        'The full push, for businesses that intend to lead their region outright.',
      lines: [
        'Up to 8 core pages, plus new SEO pages added each quarter',
        { lead: true, text: 'Everything in Momentum, plus:' },
        'Aggressive AI-answer optimisation for your niche',
        'Competitor monitoring',
        'Quarterly strategy review',
        'Six priority changes a month',
      ],
      bestFor: 'I want to lead my patch, not just keep up with it.',
      popular: false,
    },
  ],
} as const;

/* ── guarantee · 07 §2, brought across from the July landing page ────────── */

export const guarantee = {
  heading: 'Found, or the fee pauses.',
  body: [
    "Within 90 days of launch you'll be live, indexed, and showing up when people search your business name and your service area.",
    "If you're not, your monthly fee stops until you are.",
    'We agree the exact search in writing before launch, so there’s no arguing later about what "showing up" means.',
  ],
  notGuaranteed: {
    heading: "Honest about what isn't guaranteed.",
    body: 'We guarantee the part we control: built right, live, findable. We don’t promise a set number of leads, sales, or a ranking on competitive searches. Anyone who guarantees those is guessing.',
  },
  noLockIn: {
    heading: 'No lock-in. Month to month.',
    body: "You stay because it's working, not because you're trapped. There's no 12 or 24-month term to sign. Cancel any time and you're billed pro-rata to the end of that month.",
  },
  badge: {
    lines: ['90-DAY', 'GET-FOUND', 'GUARANTEE'],
    footnote: 'TERMS PUBLISHED IN FULL',
  },
} as const;

/* ── legal · 07 §4, verbatim from the July landing page ──────────────────── */

export const legalFooter =
  'RAD Local is a service of Ready Aim Digital, ABN 70 710 322 317. Prices shown are in AUD and exclude GST. The 90-day get-found guarantee covers technical findability for your own business name and service area, agreed in writing before launch. It is not a promise of ranking position, lead volume or sales.';

/* ── meta · 07 §3. The AI-search guarantee was removed; AI search survives as
      ongoing work, not as a promise. ───────────────────────────────────────── */

export const meta = {
  home: {
    title: 'Websites for regional Australian businesses. Built to be found. | RAD Local',
    description:
      'A professionally built website, live in days. $599 build, then from $199 a month, everything included. Found for your business name and area in 90 days, or the fee pauses. Leave anytime.',
  },
  about: {
    title: "About RAD Local. Who's behind it and how we work.",
    description:
      'RAD Local is run by Hayden, a regional Australian who picks up the phone. Our guarantee terms and our policy on leaving are published in full. Have a read before you decide anything.',
  },
  freeDemo: {
    title: 'Get a free sample of your website | RAD Local',
    description:
      "We'll build you a working sample of your own website. Free, no card, no obligation. See it first, then decide. Regional Australian businesses only need four details to start.",
  },
} as const;

/* ── portfolio · 11 Part 1. Captions corrected: a vet clinic is not allied
      health and a bakery is not a venue. ───────────────────────────────────── */

export const portfolio = {
  heading: 'Have a squiz at what we build.',
  lede: [
    'These are demo sites we built for regional businesses like yours.',
    'An earthmoving contractor. A vet clinic. A solar sparkie. A regional bakery.',
  ],
  /** NOTE: "Built to the same spec yours would be." was removed pending Hayden's
   *  call: the samples are in a different visual language. See 11 Part 1. */
  note: ['As real client sites go live, they’ll take this spot over.'],
  items: [
    {
      image: earthworks,
      caption: 'Earthmoving demo · featured',
      featured: true,
      alt: 'Sample site for an earthmoving contractor: a dark editorial layout with a large headline set against a cinematic photograph of an excavator at sunset.',
    },
    {
      image: vet,
      caption: 'Vet clinic demo',
      featured: false,
      alt: 'Sample site for a regional vet clinic: a calm, airy layout in bone and forest green with a warm photograph of a woman and her dog.',
    },
    {
      image: solar,
      caption: 'Solar and electrical demo',
      featured: false,
      alt: 'Sample site for a solar and electrical company: a precise typographic layout with an oversized headline beside a graphic photograph of solar panels.',
    },
    {
      image: bakery,
      caption: 'Bakery demo',
      featured: false,
      alt: 'Sample site for a regional bakery: an editorial magazine layout with a serif headline beside a close photograph of a sourdough loaf.',
    },
  ],
} as const;

/* ── free demo · 11 Part 3. The walkthrough is a booked, recorded video call. ─ */

export const demo = {
  label: 'Free demo',
  titleLead: "We'll build you a sample of your own site.",
  titleAccent: 'Free.',
  titleTail: 'Before you decide anything.',
  lede: [
    "No obligation. No card. No sales call you didn't ask for.",
    "You'll see a real working sample of your business's site… then it's your call.",
  ],
  form: {
    title: "Four quick details. That's all we need.",
    submit: 'Build my free sample',
    submitting: 'Building your sample…',
    privacy: "We'll only use this to build and show you the sample. No spam, ever.",
    privacyLinkText: 'Read our privacy policy',
    fields: [
      { name: 'name', label: 'Your name', placeholder: 'e.g. Sam Taylor', type: 'text' as const, autocomplete: 'name' },
      { name: 'business', label: 'Business name', placeholder: 'e.g. Taylor Plumbing', type: 'text' as const, autocomplete: 'organization' },
      { name: 'town', label: 'Town', placeholder: 'e.g. Wagga Wagga', type: 'text' as const, autocomplete: 'address-level2', hint: 'So we can build for where your customers actually search.' },
      { name: 'phone', label: 'Phone', placeholder: 'e.g. 0400 000 000', type: 'tel' as const, autocomplete: 'tel', inputmode: 'tel' as const },
    ],
    errors: {
      name: 'Almost there. We just need your name.',
      business: 'Almost there. We just need your business name.',
      town: 'Almost there. We just need your town.',
      phone: 'Almost there. We just need your phone number.',
      phoneShape: "That number doesn't look right. Can you check it?",
    },
    failure: {
      tag: "That didn't go through",
      body: [
        'Something went wrong on our end, not yours.',
        `Have another go, or email us at support@readyaim.digital.`,
      ],
    },
  },
  thanks: {
    title: "Beauty. We're on it.",
    body: [
      "We're having a look at your business now, and we'll start building your sample.",
      "Check your inbox. We've sent you a link to book your walkthrough.",
      'Pick a time that suits you. Nothing else to do.',
    ],
    cta: 'Book your walkthrough',
  },
  next: {
    heading: 'What happens next',
    steps: [
      {
        n: '01',
        title: 'We have a look at your business online',
        body: ['Where you show up now, what your competitors look like, and what locals in your town are searching for.'],
      },
      {
        n: '02',
        title: 'We build a working sample',
        body: ['A real site with your name on it.', 'Not a template with your logo dropped in.'],
      },
      {
        n: '03',
        title: 'We walk you through it on a video call',
        body: [
          "Book a time that suits you, and we'll share the screen.",
          "You'll see the sample, ask your questions, and take it from there.",
          "You get the recording, so you're not stuck taking notes.",
          'Or not. Your call either way.',
        ],
      },
    ],
  },
  chips: ['90-day guarantee', 'No lock-in', 'Leave anytime', '$599 build · from $199/mo'],
} as const;

export const stickyCta = {
  label: '$599 build · from $199/mo',
  labelShort: '$599 build · $199/mo',
  cta: 'Free demo',
} as const;

export const ctaLabel = 'See your free demo';

/**
 * Supplied 2026-08-12. Imported rather than served from public/ so Astro
 * generates responsive WebP at build time: the originals are a 19.6 MB
 * 4000x6000 camera file and a 2.8 MB PNG of a photograph.
 */
export const heroImages = {
  hayden: {
    image: haydenPhoto,
    alt: 'Hayden, who runs RAD Local',
  },
  town: {
    image: townPhoto,
    // Location unknown, so alt and any caption stay location-neutral:
    // no town named, and no copy implying a specific place.
    alt: 'A regional town main street',
  },
} as const;
