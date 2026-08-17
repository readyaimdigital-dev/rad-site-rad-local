export interface LegalSection {
  id: string;
  number: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  note?: string;
}

export interface ShortVersionItem {
  label: string;
  body: string;
}

export interface ShortVersionSection {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly ShortVersionItem[];
  highlights?: readonly ShortVersionItem[];
  emphasis?: string;
}

export interface LegalPage {
  title: string;
  description: string;
  headingLead: string;
  headingAccent: string;
  intro: string;
  updated: string;
  shortVersion: {
    heading: string;
    paragraphs: readonly string[];
    sections?: readonly ShortVersionSection[];
    footer?: string;
  };
  sections: readonly LegalSection[];
  closing?: {
    heading: string;
    body: string;
  };
}

const placeholderNotice =
  'This is placeholder legal content. It must be reviewed and populated with client-specific detail by a qualified advisor before launch. Do not publish as-is.';
const placeholderDate = '[DATE]';

export const legalPages = {
  privacy: {
    title: 'Privacy policy | RAD Local',
    description: 'What we collect, why we collect it, and what we never do with it.',
    headingLead: 'Privacy',
    headingAccent: 'policy',
    intro: 'What we collect, why we collect it, and what we never do with it.',
    updated: placeholderDate,
    shortVersion: {
      heading: 'We ask for what we need to build your site. Nothing else.',
      paragraphs: [
        "Placeholder. We don't sell your details. [LEGAL COPY TO BE SUPPLIED]",
        'Placeholder. Plain summary of the detail below, kept honest and short.',
      ],
    },
    sections: [
      {
        id: 'collect',
        number: '01',
        heading: 'What we collect',
        paragraphs: [
          'Placeholder. The details you give us through the demo form and during a build. [LEGAL COPY TO BE SUPPLIED]',
        ],
        bullets: [
          'Name, business name, town and phone number.',
          'Placeholder item covering billing details held by our payment provider.',
          'Placeholder item covering site content and images you send us.',
        ],
      },
      {
        id: 'why',
        number: '02',
        heading: 'Why we collect it',
        paragraphs: [
          'Placeholder. Purposes: building the sample, running the site, billing, and getting in touch about your account. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'sharing',
        number: '03',
        heading: 'Who else sees it',
        paragraphs: [
          'Placeholder. Named service providers: hosting, email, payments and analytics. Nothing sold, nothing rented. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'storage',
        number: '04',
        heading: "Where it's stored",
        paragraphs: [
          'Placeholder. Storage location, security measures, and how long records are kept. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'cookies',
        number: '05',
        heading: 'Cookies and analytics',
        paragraphs: [
          'Placeholder. Which cookies this site sets, what analytics we run, and how to opt out. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'access',
        number: '06',
        heading: 'Access and correction',
        paragraphs: [
          'Placeholder. How to ask for a copy of what we hold and how to have it corrected. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'deletion',
        number: '07',
        heading: 'Deletion',
        paragraphs: [
          'Placeholder. What we delete when you leave, what we keep for tax records, and the timeframe. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'complaints',
        number: '08',
        heading: 'Complaints',
        paragraphs: [
          'Placeholder. How to raise a privacy complaint with us, and your right to take it to the OAIC. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'contact',
        number: '09',
        heading: 'Contact',
        paragraphs: [
          'Placeholder. Privacy enquiries go to [EMAIL] or [PHONE]. Postal address [ADDRESS].',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of service | RAD Local',
    description: 'The terms that cover your RAD Local website subscription. Plain English, nothing buried.',
    headingLead: 'Terms of',
    headingAccent: 'service',
    intro: 'The rules that cover your subscription. Written to be read, not to be survived.',
    updated: placeholderDate,
    shortVersion: {
      heading: "What's yours, what's ours, and what happens if you leave",
      paragraphs: [
        'One page. Read it before you pay us anything. It forms part of these Terms of Service.',
      ],
      sections: [
        {
          heading: 'Yours. Always. In your name.',
          bullets: [
            { label: 'Your domain', body: 'your web address, in your name, the whole time' },
            { label: 'Your Google Business Profile', body: 'yours, we just set it up and work on it' },
            { label: 'Your photos, words and content', body: 'including anything we write or shoot for you' },
            { label: 'Your brand', body: 'obviously' },
          ],
          paragraphs: [
            'We never put any of these in our name. We never place a hold or a lien over them.',
            'Not for a payment dispute, not for anything.',
          ],
        },
        {
          heading: "Ours. It's the service you're paying for.",
          bullets: [
            { label: 'The website build', body: 'we build it, and you subscribe to it' },
            { label: 'Hosting, security, SSL and backups', body: 'the unglamorous part that stops a site quietly falling over' },
            { label: 'The ongoing getting-found work', body: 'Google and AI search, every month, on the plans that include it' },
            { label: 'The system underneath', body: 'the platform and method we use to build and run sites stays ours' },
          ],
          emphasis: "While you subscribe, you don't own the website outright. We're telling you that plainly, up front, because plenty of people in this industry don't.",
        },
        {
          heading: 'And if you leave?',
          paragraphs: [
            'You can leave any time. Month to month, no lock-in, no minimum term.',
            'We never hold the things that would strand you. That is deliberate.',
          ],
          bullets: [
            { label: 'No exit fee.', body: "Cancelling takes effect at your next renewal date. You keep the service until then, and there's nothing to pay after it. We bill monthly in advance and don't split billing periods, so a month already paid for isn't refunded. Want it switched off sooner? Just say so." },
            { label: 'You take a full export of your site files', body: 'any time, for any reason, free. Not just when you leave.' },
            { label: 'Your domain, your Google profile and your content stay exactly where they are', body: 'they were always yours.' },
            { label: 'The service stops.', body: "Hosting, maintenance and the monthly work end. That's the service ending, not a punishment." },
          ],
        },
        {
          heading: "What we guarantee, and what we don't",
          highlights: [
            { label: 'We guarantee:', body: "within 90 days of launch you'll be live, indexed, and showing up when someone searches your business name and your area. We agree that exact search with you in writing before launch. If you're not showing up, your monthly fee stops until you are." },
            { label: "We don't guarantee:", body: 'leads, sales, enquiries, traffic, or a ranking position on competitive searches like "plumber Dubbo". Nobody can honestly promise those. Getting found on competitive searches is ongoing work we do over time. It is not a guarantee.' },
          ],
          paragraphs: [
            'Your rights under the Australian Consumer Law always apply, on top of everything above.',
          ],
        },
      ],
      footer: 'Ready Aim Digital · ABN 70 710 322 317 · Maclean, NSW',
    },
    sections: [
      {
        id: 'agreement',
        number: '01',
        heading: 'The agreement',
        paragraphs: [
          'Placeholder. This clause will set out who the agreement is between, when it starts, and what forms part of it. [LEGAL COPY TO BE SUPPLIED]',
          'Placeholder. Second paragraph covering acceptance, the ordering process, and how a subscription begins once the first payment clears.',
        ],
      },
      {
        id: 'what-we-do',
        number: '02',
        heading: 'What we build and run',
        paragraphs: [
          'Placeholder. Scope of the build, hosting, maintenance and monthly work included in the subscription. [LEGAL COPY TO BE SUPPLIED]',
        ],
        bullets: [
          'Placeholder item covering design and build.',
          'Placeholder item covering hosting, security and uptime.',
          'Placeholder item covering monthly updates and support hours.',
        ],
      },
      {
        id: 'what-you-do',
        number: '03',
        heading: 'What you supply',
        paragraphs: [
          'Placeholder. Your obligations around content, approvals, access to accounts, and accuracy of what you give us. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'payment',
        number: '04',
        heading: 'Payment',
        paragraphs: [
          'Placeholder. Build fee, monthly amount, billing date, payment methods, GST treatment, and what happens if a payment fails. [LEGAL COPY TO BE SUPPLIED]',
        ],
        note: 'Placeholder note: pricing figures live on the pricing page and are repeated here once final.',
      },
      {
        id: 'ownership',
        number: '05',
        heading: 'Ownership',
        paragraphs: [
          'Placeholder. The asset split: your domain, your Google Business Profile, your content and your brand stay yours. The site itself is the service. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'guarantee',
        number: '06',
        heading: 'Guarantee terms',
        paragraphs: [
          'Placeholder. Scope of the 90 day guarantee, what it covers, what it does not cover, and how a pause is applied. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'leaving',
        number: '07',
        heading: 'Leaving',
        paragraphs: [
          'Placeholder. Notice period, final billing, what you take with you, and how the handover works. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'liability',
        number: '08',
        heading: 'Liability',
        paragraphs: [
          'Placeholder. Limits of liability, Australian Consumer Law rights that cannot be excluded, and third party service outages. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'changes',
        number: '09',
        heading: 'Changes to these terms',
        paragraphs: [
          'Placeholder. How and when we update these terms, and how you will be told. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
      {
        id: 'law',
        number: '10',
        heading: 'Governing law',
        paragraphs: [
          'Placeholder. These terms are governed by the laws of [STATE], Australia. [LEGAL COPY TO BE SUPPLIED]',
        ],
      },
    ],
    closing: {
      heading: 'Not sure what a clause means? Ask.',
      body: 'Placeholder. Call or email and you will get a straight answer from the person who built it. [CONTACT DETAILS TO BE SUPPLIED]',
    },
  },
} satisfies Record<'privacy' | 'terms', LegalPage>;

export const legalTemplateNotice = placeholderNotice;
