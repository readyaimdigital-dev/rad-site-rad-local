import { site } from "./site";
import type { IconName } from "../components/ui/icon-names";

export interface ServiceImageContent {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
}

export interface ServicePricingContent {
  basis: string;
  note: string;
}

export interface ServiceContent {
  id: string;
  title: string;
  body: string;
  icon: IconName;
  image: ServiceImageContent;
  pricing: ServicePricingContent;
}

export interface TrustPillarContent {
  icon: IconName;
  title: string;
  body: string;
}

export interface ProcessStepContent {
  title: string;
  body: string;
}

export interface FaqItemContent {
  question: string;
  answer: string;
}

export interface GalleryImageContent {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
}

export interface FactStatContent {
  k: string;
  v: string;
}

export interface LegalSectionContent {
  heading: string;
  body: string;
  email?: string;
}

const services: ServiceContent[] = [
  {
    id: "emergency-plumbing",
    title: "Emergency plumbing",
    body: "Available for urgent leaks, blockages and burst pipes.",
    icon: "wrench",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      caption: "Emergency callout",
    },
    pricing: { basis: "Call-out rate", note: "Fixed call-out fee, quoted before work starts." },
  },
  {
    id: "hot-water-systems",
    title: "Hot water systems",
    body: "Supply, repair and replacement of gas and electric units.",
    icon: "house",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      caption: "Hot water install",
    },
    pricing: { basis: "Per install", note: "Price depends on unit type and access." },
  },
  {
    id: "gas-fitting",
    title: "Gas fitting",
    body: "Licensed gas fitting for appliances, heaters and cooktops.",
    icon: "shield-check",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      caption: "Gas fitting",
    },
    pricing: { basis: "Per appointment", note: "Includes compliance certificate where required." },
  },
  {
    id: "drain-clearing",
    title: "Drain clearing",
    body: "Camera inspections and high-pressure drain clearing.",
    icon: "check-circle",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      caption: "Drain inspection",
    },
    pricing: { basis: "Per drain", note: "Camera inspection quoted separately on request." },
  },
  {
    id: "bathroom-renovations",
    title: "Bathroom renovations",
    body: "Complete plumbing for renovations and new builds.",
    icon: "star",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      caption: "Renovation rough-in",
    },
    pricing: { basis: "Per project", note: "Fixed quote once the scope is confirmed." },
  },
  {
    id: "maintenance-plans",
    title: "Maintenance plans",
    body: "Scheduled checks to catch problems before they start.",
    icon: "calendar-check",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      caption: "Maintenance visit",
    },
    pricing: { basis: "Per plan", note: "Annual and biannual visit plans available." },
  },
];

const trustPillars: TrustPillarContent[] = [
  {
    icon: "shield-check",
    title: "Licensed & insured",
    body: "Fully licensed, insured and compliant on every job.",
  },
  {
    icon: "clock",
    title: "On-time, every time",
    body: "We show up when we say we will and keep you updated.",
  },
  {
    icon: "star",
    title: "Quality workmanship",
    body: "Careful, tidy work backed by a workmanship guarantee.",
  },
  {
    icon: "map-pin",
    title: "Local & reliable",
    body: "A local team that knows the area and responds fast.",
  },
];

const legalNotice = {
  label: "Template notice:",
  body: "this is placeholder legal content. It must be reviewed and populated with client-specific detail by a qualified advisor before the site launches. Do not publish as-is.",
};

const privacySections: LegalSectionContent[] = [
  {
    heading: "1. Introduction",
    body: '[Business Legal Name] ("we", "us") respects your privacy. This policy explains what personal information we collect, how we use it, and your rights under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
  },
  {
    heading: "2. Information we collect",
    body: "[Describe the personal information collected, for example: name, email address, phone number and any details submitted via the contact form.]",
  },
  {
    heading: "3. How we use your information",
    body: "[Describe the purposes information is used for, such as responding to enquiries and providing quotes.]",
  },
  {
    heading: "4. Disclosure of information",
    body: "[State whether information is shared with third parties, such as email delivery providers, and under what circumstances.]",
  },
  {
    heading: "5. Data security",
    body: "[Describe security measures in place to protect personal information.]",
  },
  {
    heading: "6. Your rights",
    body: "[Explain how a person can access, correct or request deletion of their personal information, and provide a contact method.]",
  },
  {
    heading: "7. Contact us",
    body: "For privacy enquiries, contact us at",
    email: site.contact.email,
  },
];

const termsSections: LegalSectionContent[] = [
  {
    heading: "1. Acceptance of terms",
    body: 'By using the website of [Business Legal Name] ("we", "us"), you agree to these terms. If you do not agree, please do not use this website.',
  },
  {
    heading: "2. Services",
    body: "[Describe the services offered and any conditions that apply to quotes, bookings or work performed.]",
  },
  {
    heading: "3. Website use",
    body: "[Describe acceptable use of the website, including any restrictions on copying content or misusing the contact form.]",
  },
  {
    heading: "4. Limitation of liability",
    body: "[Insert liability limitations appropriate to the business and reviewed by a qualified legal advisor.]",
  },
  {
    heading: "5. Governing law",
    body: `These terms are governed by the laws of ${site.address.state}, Australia.`,
  },
  {
    heading: "6. Contact us",
    body: "For questions about these terms, contact us at",
    email: site.contact.email,
  },
];

export const content = {
  services,
  trustPillars,
  home: {
    hero: {
      eyebrow: "Licensed local plumbers",
      heading: site.tagline,
      headlineAccent: "day or night.",
      intro: site.description,
      primaryCta: "Get a quote",
      secondaryCta: "Our services",
      facts: [
        { k: "Response", v: "Same-day" },
        { k: "Experience", v: "15+ years" },
        {
          k: "Coverage",
          v: `${site.serviceArea.length} ${site.serviceArea.length === 1 ? "suburb" : "suburbs"}`,
        },
        { k: "Guarantee", v: "Workmanship" },
      ] as FactStatContent[],
      image: {
        src: "/images/placeholder.svg",
        alt: "",
        label: site.name,
        note: "Local & licensed",
      },
    },
    servicesHeading: "What we do",
    featuredServiceIds: ["emergency-plumbing", "gas-fitting", "bathroom-renovations"],
    why: {
      eyebrow: "Why choose us",
      heading: "Straightforward plumbing, done right",
    },
    ownerIntro: {
      eyebrow: "Meet the team",
      heading: "Local plumbers, straight answers",
      body: "This is placeholder copy for the starter template. Replace with the client's own story, team and values before launch.",
      ctaLabel: "More about us",
      image: {
        src: "/images/placeholder.svg",
        alt: "",
        label: site.name,
        note: "Team image placeholder",
      },
    },
    gallery: {
      eyebrow: "Recent work",
      heading: "Jobs we're proud of",
      intro:
        "Placeholder gallery copy for the starter template. Replace with the client's own project photos before launch.",
      images: [
        { src: "/images/placeholder.svg", alt: "", caption: "Bathroom renovation" },
        { src: "/images/placeholder.svg", alt: "", caption: "Hot water install" },
        { src: "/images/placeholder.svg", alt: "", caption: "Drain inspection" },
        { src: "/images/placeholder.svg", alt: "", caption: "Gas fitting" },
        { src: "/images/placeholder.svg", alt: "", caption: "Emergency callout" },
        { src: "/images/placeholder.svg", alt: "", caption: "Maintenance visit" },
      ] as GalleryImageContent[],
    },
    serviceAreaHeading: "Where we work",
    serviceAreaEyebrow: "Where we work",
    serviceAreaIntro: "We proudly serve",
    serviceAreaSuffix: "and surrounding areas.",
    serviceAreaLead:
      "We proudly serve homes and businesses across the region with fast, reliable plumbing and gas fitting.",
    serviceAreaImage: {
      src: "/images/placeholder.svg",
      alt: "",
    },
    cta: {
      heading: "Ready when you are",
      sub: "Get a free, no-obligation quote from your local team.",
      ctaLabel: "Get a quote",
    },
  },
  servicesPage: {
    title: "Services",
    eyebrow: "What we do",
    heading: "Our services",
    headlineAccent: "done right.",
    description: `Plumbing and gas fitting services from ${site.name}.`,
    intro:
      "Placeholder service list for the starter template. Replace with the client's actual services and pricing approach before launch.",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      meta: "On the job",
    },
    serviceLabels: {
      eyebrowPrefix: "Service",
      pricingValue: "Free quote",
      primaryCtaLabel: "Get a quote",
      secondaryCtaLabel: "More about pricing",
    },
    pricing: {
      eyebrow: "Pricing basis",
      heading: "A clear starting point for every job",
      featuredServiceIds: ["emergency-plumbing", "hot-water-systems", "gas-fitting", "bathroom-renovations"],
      ctaLabel: "Ask for a quote",
      prompt: "Wondering what it'll cost?",
    },
    process: {
      eyebrow: "How it works",
      heading: "From first call to finished job",
      steps: [
        { title: "Call or enquire", body: "Tell us what's going on and we'll ask a few quick questions." },
        { title: "Get a free quote", body: "We'll give you a clear price before any work starts." },
        { title: "Book a time", body: "Pick a time that suits, including same-day for urgent jobs." },
        { title: "Job done right", body: "We tidy up, walk you through the work and follow up if needed." },
      ] as ProcessStepContent[],
    },
    faq: {
      eyebrow: "Common questions",
      heading: "Frequently asked questions",
      items: [
        {
          question: "Do you charge a call-out fee?",
          answer: "Yes, a fixed call-out fee applies and is always confirmed before we start work.",
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes. Our team is fully licensed and insured for residential and commercial work.",
        },
        {
          question: "Can you help with emergencies?",
          answer: "Yes, we offer same-day emergency callouts for urgent leaks, blockages and burst pipes.",
        },
        {
          question: "Do you offer a workmanship guarantee?",
          answer: "Yes, every job is backed by our workmanship guarantee.",
        },
      ] as FaqItemContent[],
    },
    cta: {
      heading: "Got a job for us?",
      sub: "Get a free, no-obligation quote from your local team.",
      ctaLabel: "Get a quote",
    },
  },
  about: {
    title: "About us",
    eyebrow: "About us",
    heading: `About ${site.name}`,
    description: `About ${site.name} and how we serve ${site.serviceArea[0]}.`,
    paragraphs: [
      `${site.name} has been looking after homes and businesses across ${site.serviceArea[0]} with honest, reliable plumbing and gas fitting. Our team is fully licensed and takes pride in getting the job done right the first time.`,
      "This is placeholder copy for the starter template. Replace with the client's own story, values and history before launch.",
    ],
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      label: site.name,
      note: "Local & licensed",
    },
    primaryCtaLabel: "Get a quote",
    secondaryCtaLabel: "See our work",
    credentials: {
      eyebrow: "Why homeowners trust us",
      heading: "The standards we bring to every job",
    },
    process: {
      eyebrow: "How we work",
      heading: "A straightforward process, every time",
      steps: [
        { title: "Enquiry", body: "Get in touch and tell us what you need help with." },
        { title: "Assessment", body: "We assess the job and answer any questions you have." },
        { title: "Quote", body: "You get a clear, fixed quote before any work begins." },
        { title: "Completion", body: "We complete the work and leave the site tidy." },
      ] as ProcessStepContent[],
    },
    whereEyebrow: "Where we work",
    whereHeading: "Proudly serving the region",
    whereLead:
      "We work across the following suburbs and surrounding areas, with a local team that knows the region well.",
    whereImage: {
      src: "/images/placeholder.svg",
      alt: "",
    },
    cta: {
      heading: "Ready to get started?",
      sub: "Get a free, no-obligation quote from your local team.",
      ctaLabel: "Get a quote",
    },
  },
  contact: {
    title: "Contact",
    heading: "Get in touch",
    description: `Get in touch with ${site.name}.`,
    intro:
      "Send us a message and we'll get back to you as soon as we can, or call us directly during business hours.",
    phoneEyebrow: "Call us",
    phoneNote: "Available for same-day emergency callouts.",
    detailsEyebrow: "Email and address",
    trustEyebrow: "Why choose us",
    areaEyebrow: "Where we work",
  },
  privacy: {
    title: "Privacy Policy",
    heading: "Privacy Policy",
    description: `Privacy policy for ${site.name}.`,
    notice: legalNotice,
    lastUpdated: "Last updated: [Effective Date]",
    sections: privacySections,
  },
  terms: {
    title: "Terms of Service",
    heading: "Terms of Service",
    description: `Terms of service for ${site.name}.`,
    notice: legalNotice,
    lastUpdated: "Last updated: [Effective Date]",
    sections: termsSections,
  },
} as const;

export function getFeaturedServices(): ServiceContent[] {
  const featuredIds = new Set<string>(content.home.featuredServiceIds);
  return services.filter((service) => featuredIds.has(service.id));
}

export function getServicesByIds(ids: readonly string[]): ServiceContent[] {
  const servicesById = new Map(services.map((service) => [service.id, service]));
  return ids
    .map((id) => servicesById.get(id))
    .filter((service): service is ServiceContent => service !== undefined);
}
