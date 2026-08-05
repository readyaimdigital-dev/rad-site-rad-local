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
    id: "website-builds",
    title: "Website builds",
    body: "Clear, credible websites for regional businesses that need a better online home.",
    icon: "house",
    image: { src: "/images/placeholder.svg", alt: "", caption: "Website build" },
    pricing: { basis: "Scope-based", note: "We confirm the right scope after understanding your business." },
  },
  {
    id: "website-support",
    title: "Ongoing website support",
    body: "Practical help keeping your website updated, cared for and moving in the right direction.",
    icon: "wrench",
    image: { src: "/images/placeholder.svg", alt: "", caption: "Ongoing support" },
    pricing: { basis: "Managed relationship", note: "Support is shaped around the needs of your website and business." },
  },
  {
    id: "website-growth",
    title: "Website growth",
    body: "New pages, improvements and development work as your business changes.",
    icon: "arrow-right",
    image: { src: "/images/placeholder.svg", alt: "", caption: "Website improvement" },
    pricing: { basis: "Scoped work", note: "We agree the next useful improvement before work begins." },
  },
];

const trustPillars: TrustPillarContent[] = [
  {
    icon: "map-pin",
    title: "Regional perspective",
    body: "We understand that regional businesses need practical, personal support.",
  },
  {
    icon: "calendar-check",
    title: "Ongoing support",
    body: "Your website does not have to become another job on your list.",
  },
  {
    icon: "check-circle",
    title: "Plain-English guidance",
    body: "Clear recommendations without unnecessary technical jargon.",
  },
  {
    icon: "shield-check",
    title: "A managed relationship",
    body: "A consistent team to help keep your website useful over time.",
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
      eyebrow: "Websites for regional businesses",
      heading: site.tagline,
      headlineAccent: "without the technical headache.",
      intro: site.description,
      primaryCta: "Start a conversation",
      secondaryCta: "See how it works",
      facts: [
        { k: "For", v: "Regional businesses" },
        { k: "Approach", v: "Human-led" },
        { k: "Support", v: "Ongoing" },
        { k: "Coverage", v: `${site.serviceArea.length} areas` },
        { k: "Next step", v: "Enquire" },
      ] as FactStatContent[],
      image: {
        src: "/images/placeholder.svg",
        alt: "",
        label: "RAD Local preview",
        note: "Brand imagery pending review",
      },
    },
    servicesHeading: "A website that keeps working",
    featuredServiceIds: ["website-builds", "website-support", "website-growth"],
    why: {
      eyebrow: "Why RAD Local",
      heading: "Practical support for the whole website journey",
    },
    ownerIntro: {
      eyebrow: "Built for real businesses",
      heading: "You should not need to become a web expert",
      body: "We help regional business owners get a clearer website, then stay available when the site needs attention or improvement.",
      ctaLabel: "How we work",
      image: {
        src: "/images/placeholder.svg",
        alt: "",
        label: "RAD Local preview",
        note: "Team imagery pending review",
      },
    },
    gallery: {
      eyebrow: "Our approach",
      heading: "A useful website, not a set-and-forget project",
      intro: "We focus on clear communication, sensible decisions and support that continues after launch.",
      images: [
        { src: "/images/placeholder.svg", alt: "", caption: "Clear direction" },
        { src: "/images/placeholder.svg", alt: "", caption: "Thoughtful build" },
        { src: "/images/placeholder.svg", alt: "", caption: "Ongoing support" },
      ] as GalleryImageContent[],
    },
    serviceAreaHeading: "Where we work",
    serviceAreaEyebrow: "Regional by design",
    serviceAreaIntro: "We work with businesses across",
    serviceAreaSuffix: "and surrounding areas.",
    serviceAreaLead: "We work with regional Australian businesses through a remote, managed support model.",
    serviceAreaImage: {
      src: "/images/placeholder.svg",
      alt: "",
    },
    cta: {
      heading: "Want a website that is easier to manage?",
      sub: "Tell us a little about your business and we will start with a useful conversation.",
      ctaLabel: "Start a conversation",
    },
  },
  servicesPage: {
    title: "Website services",
    eyebrow: "What we do",
    heading: "A website that earns its keep",
    headlineAccent: "with support behind it.",
    description: `Website builds and ongoing support from ${site.name}.`,
    intro:
      "We build a clear website around your business, then stay available when it needs updating, improving or explaining.",
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      meta: "Preview imagery pending review",
    },
    serviceLabels: {
      eyebrowPrefix: "Service",
      pricingValue: "Tailored to scope",
      primaryCtaLabel: "Talk to us",
      secondaryCtaLabel: "How it works",
    },
    pricing: {
      eyebrow: "How we scope work",
      heading: "The right next step depends on your website",
      featuredServiceIds: ["website-builds", "website-support", "website-growth"],
      ctaLabel: "Start a conversation",
      prompt: "Not sure what you need yet?",
    },
    process: {
      eyebrow: "How it works",
      heading: "A straightforward path from idea to ongoing support",
      steps: [
        { title: "Tell us about the business", body: "We start with your goals, audience and what the current website is not doing well." },
        { title: "Agree the direction", body: "We turn the useful information into a clear page structure and visual direction." },
        { title: "Build and refine", body: "We create the site, check it carefully and make the agreed revisions." },
        { title: "Keep it moving", body: "Ongoing support is available when the website needs attention or improvement." },
      ] as ProcessStepContent[],
    },
    faq: {
      eyebrow: "Common questions",
      heading: "Questions people often ask",
      items: [
        {
          question: "Do you work with regional businesses outside the Clarence Valley?",
          answer: "RAD Local is designed for regional Australian businesses. We can discuss your location and needs during the first conversation.",
        },
        {
          question: "Do I need to know exactly what I want before I enquire?",
          answer: "No. A useful first conversation can start with what is not working and what you would like the website to do better.",
        },
        {
          question: "Can you support an existing website?",
          answer: "That depends on the platform, access and the type of help you need. We can assess it before recommending the next step.",
        },
        {
          question: "What happens after I send an enquiry?",
          answer: "We review the information, then get back to you to understand the business and suggest a useful next step.",
        },
      ] as FaqItemContent[],
    },
    cta: {
      heading: "Ready to make the website easier?",
      sub: "Send through a few details and we will take it from there.",
      ctaLabel: "Start a conversation",
    },
  },
  about: {
    title: "About RAD Local",
    eyebrow: "About RAD Local",
    heading: "Websites with people behind them",
    description: `About ${site.name} and the support behind the website.`,
    paragraphs: [
      "RAD Local is the regional-business website offer from Ready Aim Digital. We help business owners get a clearer online presence without leaving them to manage every technical detail alone.",
      "The work starts with understanding the business, the people it serves and what the website needs to do. Support can continue after launch as the business changes.",
    ],
    image: {
      src: "/images/placeholder.svg",
      alt: "",
      label: "RAD Local preview",
      note: "Brand imagery pending review",
    },
    primaryCtaLabel: "Start a conversation",
    secondaryCtaLabel: "See the services",
    credentials: {
      eyebrow: "What matters to us",
      heading: "Clear work, careful communication and ongoing support",
    },
    process: {
      eyebrow: "How we work",
      heading: "A practical process from first conversation onwards",
      steps: [
        { title: "Understand", body: "We learn about the business, audience and goals." },
        { title: "Shape", body: "We turn the useful information into a clear direction." },
        { title: "Build", body: "We create and refine the website with the agreed scope in view." },
        { title: "Support", body: "We remain available when the website needs attention." },
      ] as ProcessStepContent[],
    },
    whereEyebrow: "Where we work",
    whereHeading: "Built for regional Australian businesses",
    whereLead: `RAD Local is based in the Clarence Valley and works with businesses across ${site.serviceArea.join(", ")} and surrounding regional areas.`,
    whereImage: {
      src: "/images/placeholder.svg",
      alt: "",
    },
    cta: {
      heading: "Ready to talk about the website?",
      sub: "Send through a few details and we will suggest a useful next step.",
      ctaLabel: "Start a conversation",
    },
  },
  contact: {
    title: "Contact",
    heading: "Start a conversation",
    description: `Get in touch with ${site.name}.`,
    intro:
      "Tell us a little about your business and what you would like the website to do better.",
    phoneEyebrow: "Call us",
    phoneNote: "Calls are by appointment.",
    detailsEyebrow: "Email and address",
    trustEyebrow: "What to expect",
    areaEyebrow: "Service area",
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
