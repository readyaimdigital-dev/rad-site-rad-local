import { site } from "./site";

export interface ServiceContent {
  id: string;
  title: string;
  body: string;
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
  },
  {
    id: "hot-water-systems",
    title: "Hot water systems",
    body: "Supply, repair and replacement of gas and electric units.",
  },
  {
    id: "gas-fitting",
    title: "Gas fitting",
    body: "Licensed gas fitting for appliances, heaters and cooktops.",
  },
  {
    id: "drain-clearing",
    title: "Drain clearing",
    body: "Camera inspections and high-pressure drain clearing.",
  },
  {
    id: "bathroom-renovations",
    title: "Bathroom renovations",
    body: "Complete plumbing for renovations and new builds.",
  },
  {
    id: "maintenance-plans",
    title: "Maintenance plans",
    body: "Scheduled checks to catch problems before they start.",
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
  home: {
    hero: {
      heading: site.tagline,
      intro: site.description,
      primaryCta: "Get a quote",
      secondaryCta: "Our services",
    },
    servicesHeading: "What we do",
    featuredServiceIds: ["emergency-plumbing", "gas-fitting", "bathroom-renovations"],
    serviceAreaHeading: "Where we work",
    serviceAreaIntro: "We proudly serve",
    serviceAreaSuffix: "and surrounding areas.",
  },
  servicesPage: {
    title: "Services",
    heading: "Our services",
    description: `Plumbing and gas fitting services from ${site.name}.`,
    intro:
      "Placeholder service list for the starter template. Replace with the client's actual services and pricing approach before launch.",
  },
  about: {
    title: "About us",
    heading: `About ${site.name}`,
    description: `About ${site.name} and how we serve ${site.serviceArea[0]}.`,
    paragraphs: [
      `${site.name} has been looking after homes and businesses across ${site.serviceArea[0]} with honest, reliable plumbing and gas fitting. Our team is fully licensed and takes pride in getting the job done right the first time.`,
      "This is placeholder copy for the starter template. Replace with the client's own story, values and history before launch.",
    ],
  },
  contact: {
    title: "Contact",
    heading: "Get in touch",
    description: `Get in touch with ${site.name}.`,
    intro:
      "Send us a message and we'll get back to you as soon as we can, or call us directly during business hours.",
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
