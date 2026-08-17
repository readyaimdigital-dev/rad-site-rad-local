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
  eyebrow?: string;
  headingLead: string;
  headingAccent: string;
  intro: string;
  updated: string;
  showTemplateNotice?: boolean;
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
export const legalPages = {
  privacy: {
    title: 'Privacy policy | RAD Local',
    description: 'What we collect, why we collect it, and what we never do with it.',
    eyebrow: 'PRIVACY',
    headingLead: 'Privacy',
    headingAccent: 'policy',
    intro: 'What we collect, why we collect it, and what we never do with it.',
    updated: '17 Aug 2026',
    showTemplateNotice: false,
    shortVersion: {
      heading: 'We ask for what we need to build your site. Nothing else.',
      paragraphs: [
        "We don't sell your details. We don't rent them, trade them, or hand them to anyone building a marketing list. That isn't a policy we might revisit. It's just not the business we're in.",
        "What we collect is what it takes to build your site, keep it running, send you an invoice and pick up the phone when you call. Below is the long version, in plain English. If anything here isn't clear, ring us and ask.",
      ],
    },
    sections: [
      {
        id: 'collect',
        number: '01',
        heading: 'What we collect',
        paragraphs: [
          'The details you give us through the demo form and during your build.',
        ],
        bullets: [
          "Your contact details: your name, your business name, your town, your phone number and your email. That's what the demo form asks for, and it's all we need to start.",
          'Your business details: what you do, where you do it, your hours, your services, and anything else that needs to end up on the site.',
          "Your billing details: handled by our payment and invoicing providers. We see that an invoice was paid. We don't see or store your full card number.",
          'The content you send us: photos, logos, copy, and access to things like your Google Business Profile so we can set it up and work on it.',
          "Basic site data: which pages get visited on this website, so we know what's useful and what isn't. See section 05.",
        ],
        note: "If you're a customer of a business whose site we built, and you've filled in an enquiry form on it: that enquiry belongs to that business, not to us. We pass it to them and we don't use it for anything else.",
      },
      {
        id: 'why',
        number: '02',
        heading: 'Why we collect it',
        paragraphs: [
          'Five reasons, and no sixth one:',
        ],
        bullets: [
          'To build your free sample and, if you go ahead, your site.',
          'To host it, run it and do the ongoing work of keeping you findable.',
          'To bill you.',
          'To contact you about your account, your build or your site.',
          'To meet our legal obligations, like keeping tax records.',
        ],
        note: "We don't use your details for anything you didn't come to us for. We won't add you to a mailing list you didn't ask for, and we won't pass you to anyone else to sell to.",
      },
      {
        id: 'sharing',
        number: '03',
        heading: 'Who else sees it',
        paragraphs: [
          'We use a handful of suppliers to actually deliver the service, and each of them only sees the part they need:',
        ],
        bullets: [
          'Hosting and infrastructure providers: they run the servers your site lives on.',
          "Email and file storage providers: that's where our correspondence with you sits.",
          'Payment and invoicing providers: they process your payments and issue your invoices.',
          'Analytics providers: visit numbers for this website (section 05).',
          'Google: for setting up and working on your Google Business Profile.',
        ],
        note: "Beyond that, we share your information only if the law requires it, or if our business is sold or restructured. In that case, your records move with the service, on the same terms, and we'd tell you. Nothing is sold. Nothing is rented. Nothing goes to a data broker.",
      },
      {
        id: 'storage',
        number: '04',
        heading: "Where it's stored",
        paragraphs: [
          "Your details are stored on servers run by our hosting and software providers. Some of those providers are based overseas, including in the United States, which means your information may be stored or processed outside Australia.",
          "We take reasonable steps to protect it: access is limited to the people who actually need it, accounts are protected, and we don't keep things we no longer need. No system is perfectly secure, and we won't pretend otherwise. But we treat your details as if they were ours.",
          'How long we keep it. While you\'re a client, and then for as long as the law requires afterwards. Generally seven years for anything tied to invoices and tax records. Everything else gets deleted or de-identified once we no longer need it.',
        ],
      },
      {
        id: 'cookies',
        number: '05',
        heading: 'Cookies and analytics',
        paragraphs: [
          'This website uses two kinds of cookies:',
        ],
        bullets: [
          "Essential ones, which make the site work: remembering your form entries and keeping things secure. The site can't run without them.",
          "Analytics ones, which count visits and tell us which pages people actually read. They tell us how many, not who.",
        ],
        note: "We don't run advertising or remarketing cookies at the moment. We may advertise at some point. If we do, we'll update this page and the date at the top of it before anything goes live, so this always describes what's actually running. You can block or delete cookies in your browser settings at any time. Essential cookies being blocked may stop parts of the site working, but nothing here depends on you accepting analytics.",
      },
      {
        id: 'access',
        number: '06',
        heading: 'Access and correction',
        paragraphs: [
          'You can ask us for a copy of the personal information we hold about you, and you can ask us to correct anything that\'s wrong. Both are free.',
          "Email hello@readyaim.digital and we'll come back to you within 30 days. We may need to confirm who you are first. It's your information, so we're careful about who we hand it to.",
        ],
      },
      {
        id: 'deletion',
        number: '07',
        heading: 'Deletion',
        paragraphs: [
          'You can ask us to delete what we hold about you at any time.',
          'When you leave, we delete or de-identify the personal information we no longer need. What we have to keep is anything tied to invoices and tax records. Generally seven years, because the law says so, not because we want it.',
          "Your site files are yours to export at any time, free, and your domain, your Google Business Profile and your content were always in your name. None of that depends on us. That's set out in our Terms of Service.",
        ],
      },
      {
        id: 'complaints',
        number: '08',
        heading: 'Complaints',
        paragraphs: [
          "If you think we've mishandled your personal information, tell us first. Email hello@readyaim.digital with what happened. We'll acknowledge it quickly and give you an answer within 30 days.",
        ],
        bullets: [
          'oaic.gov.au',
          '1300 363 992',
        ],
        note: "If you're not happy with how we've dealt with it, you can take it to the Office of the Australian Information Commissioner. You don't need our permission to do that, and it costs you nothing.",
      },
      {
        id: 'contact',
        number: '09',
        heading: 'Contact',
        paragraphs: [
          'Privacy enquiries go to a person, not a form:',
        ],
        bullets: [
          'Email: hello@readyaim.digital',
          'Phone: +61 2 5632 9005',
          'Post: PO Box 250, Maclean NSW 2463',
        ],
        note: 'Ready Aim Digital · ABN 70 710 322 317',
      },
    ],
  },
  terms: {
    title: 'Terms of service | RAD Local',
    description: 'The terms that cover your RAD Local website subscription. Plain English, nothing buried.',
    headingLead: 'Terms of',
    headingAccent: 'service',
    intro: 'The rules that cover your subscription. Written to be read, not to be survived.',
    updated: '17 Aug 2026',
    showTemplateNotice: false,
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
    },
    sections: [
      {
        id: 'getting',
        number: '01',
        heading: "What you're getting",
        paragraphs: [
          '1.1 We provide a website subscription service. We build your website, host it, maintain it, and do ongoing work to help your business be found online, in Google and in AI answers.',
          "1.2 The plan you choose, what it includes and what it costs are set out in your plan confirmation at signup. That's the document that governs your prices, not whatever our website says today.",
          '1.3 This is a service you subscribe to, not a one-off product you buy and own outright. Clause 4 explains exactly what that means.',
        ],
      },
      {
        id: 'free-sample',
        number: '02',
        heading: 'Your free sample',
        paragraphs: [
          '2.1 Before you pay anything, we build you a real sample of your site so you can see what you would actually be getting.',
          "2.2 The sample is free and there is no obligation. If you don't want to go ahead, you owe us nothing and that's the end of it.",
          '2.3 Until you pay the build fee, the sample stays ours. Anything of yours we used to make it, including your photos, your logo and your words, was always yours and stays yours.',
          "2.4 The sample shows you the standard of work you're getting and the direction we'd take. It isn't the finished site.",
          '2.5 If you go ahead, your site then goes through our research work: what people in your area actually search for, what your competitors are doing, and what we know performs. We build the final site around what we think will get you the best result. That can change the layout, the wording, the pages or the structure from what you saw in the sample. We build for what will work, not just for what looked good first go. Anything significant that changes, we will walk you through and tell you why. Your revision rounds (clause 7) cover the rest.',
        ],
      },
      {
        id: 'yours',
        number: '03',
        heading: "What's yours",
        paragraphs: [
          "3.1 These stay in your name and under your control the whole time: while you're with us, and after you leave:",
          '3.2 Anything we create for your business, including copy, photographs and design, becomes yours. We assign the copyright in it to you as soon as it is created.',
          '3.3 We never register, hold or transfer any of these into our name. We never place a lien or a hold over them, for any reason, including a payment dispute.',
        ],
        bullets: [
          'your domain (your web address);',
          'your Google Business Profile and any similar listings; and',
          'all of your content, photographs, copy and brand.',
        ],
      },
      {
        id: 'website-service',
        number: '04',
        heading: 'Your website is a service',
        paragraphs: [
          '4.1 Your website is provided as a subscription service. We build, host, maintain and keep working on it while you subscribe.',
          "4.2 While you subscribe, you don't own the website outright. What you do own is everything that would strand you if you left (clause 3), and you can take a full export of your site files with you at any time (clause 5).",
          '4.3 We will always describe this honestly. We will not tell you that you own the site outright while you are subscribed.',
        ],
      },
      {
        id: 'leaving-export',
        number: '05',
        heading: 'Leaving, and your file export',
        paragraphs: [
          '5.1 You can leave at any time (clause 11). You can also ask for a full export of your site files at any time, for any reason, at no charge. We will never hold your files or assets to ransom.',
          '5.2 When you take an export, you get a licence to use those site files for your own business, for as long as you like.',
          '5.3 What the export does not include is the system underneath: the platform, code and method we use to build and run sites. That stays ours, and the export gives you no rights in it.',
          "5.4 When you leave, the service stops: hosting, maintenance and the ongoing getting-found work. That's the service ending, not a penalty, and we're telling you so up front.",
        ],
      },
      {
        id: 'costs',
        number: '06',
        heading: 'What it costs',
        paragraphs: [
          '6.1 Build fee. A one-off build fee, shown in your plan confirmation, is payable when you go ahead. It covers the cost of building and launching your site. It is not refundable, except where the law requires (clause 14).',
          "6.2 Monthly subscription. Your monthly fee is shown in your plan confirmation and is payable monthly in advance. There's no lock-in and no minimum term.",
          '6.3 Extra work. Anything beyond what your plan includes (clause 7) gets quoted to you first, and we only do it if you approve the quote. No surprise bills.',
          '6.4 GST. Prices are shown excluding GST unless we say otherwise. GST is added to your invoice.',
          '6.5 Late payment. If a payment is overdue, we may pause non-essential work after telling you first. Your assets (clause 3) and your right to an export (clause 5) are never affected by a payment issue.',
        ],
      },
      {
        id: 'plan-included',
        number: '07',
        heading: "Your plan and what's included",
        paragraphs: [
          '7.1 Your plan, the pages, the revision rounds, and the monthly content updates we do for you, is set out in your plan confirmation.',
          "7.2 The monthly allowance counts changes our team makes for you. It isn't a limit on how often you can edit your own site. If a self-serve editing tool is included on your plan, your plan confirmation will say so.",
          "7.3 A content update means a content or image change: new prices, a new photo, updated hours, a bit of new copy. It doesn't mean a redesign or a whole new page. Bigger jobs are quoted separately under clause 6.3 before we touch them.",
          '7.4 You can move up or down between plans at any time. A change takes effect from your next billing period.',
        ],
      },
      {
        id: 'guarantee',
        number: '08',
        heading: 'Our 90-day guarantee',
        paragraphs: [
          "8.1 Here's the guarantee, in full: Within 90 days of launch your site will be live, indexed, and showing up when someone searches for your business by name and area (for example, \"Joe's Plumbing Dubbo\"). This is not a promise of ranking for category searches like \"plumber Dubbo\". If it isn't, your monthly fee stops until it is, and this is in addition to your rights under the Australian Consumer Law, which always apply. You don't pay the monthly fee until your site is findable.",
          '8.2 What "found" means. Your site shows up for a search of your business name and area. We agree that exact search with you in writing before launch and record it in your plan confirmation, so at day 90 we are both measuring the same thing.',
          "8.3 What it doesn't cover. It isn't a promise about ranking position, competitive searches (like \"plumber Dubbo\"), leads, sales or traffic. Getting found for competitive searches is ongoing growth work we do over time, not a guarantee.",
          '8.4 How it works if you claim it. Your monthly fee pauses until your site is findable, then resumes from that day. The build fee is not affected. Your rights under clause 14 always apply regardless.',
        ],
      },
      {
        id: 'not-guarantee',
        number: '09',
        heading: "What we don't guarantee",
        paragraphs: [
          "9.1 We can't and don't guarantee lead volume, sales, enquiries, traffic, conversion rates or search ranking positions. Those depend on things outside our control: your market, your competitors, your pricing, and how search engines choose to behave.",
          "9.2 We'll always be straight with you about what we can and can't promise. Anyone guaranteeing you a number one ranking or a set number of leads is guessing.",
        ],
      },
      {
        id: 'what-we-need',
        number: '10',
        heading: 'What we need from you',
        paragraphs: [
          '10.1 You will give us the content, images, access and information we need to do the job.',
          '10.2 You will make sure you actually have the right to use anything you give us: photos, logos and copy.',
          '10.3 You will keep your contact and billing details current, and use the service lawfully.',
          "10.4 If we can't get what we need from you, timelines move. We'll tell you when that's happening rather than letting it drift.",
        ],
      },
      {
        id: 'cancelling',
        number: '11',
        heading: 'Cancelling',
        paragraphs: [
          '11.1 You can cancel at any time, with no exit fee. Email us and it is done.',
          "11.2 Cancelling takes effect at your next renewal date. You keep the service, and we keep working on your site, right up until then. If you'd rather it stopped sooner, tell us and we'll switch it off.",
          "11.3 We bill monthly in advance and we don't split billing periods, so there's no refund for the unused part of a month you've already paid for. There's nothing further to pay after that period ends.",
          '11.4 A build fee already paid is not refundable, except where the law requires (clause 14).',
          '11.5 When you cancel:',
          '11.6 We can also end the service, on 30 days notice, if we are no longer able to provide it. If we do, you will not pay for any period after it stops, and we will refund the unused part of anything you have already paid. Clause 11.5 applies the same way.',
        ],
        bullets: [
          'you can take a full export of your site files (clause 5);',
          'your domain, your Google Business Profile and your content are already yours and stay untouched; and',
          'hosting, maintenance and ongoing work stop.',
        ],
      },
      {
        id: 'privacy',
        number: '12',
        heading: 'Your privacy',
        paragraphs: [
          '12.1 We collect your contact and business details to set up and provide your service.',
          "12.2 We share them with the suppliers we use to deliver it: our hosting and technology providers, and Google for your Business Profile, so they can do their part. We don't sell your information to anyone.",
          '12.3 We handle your personal information in line with the Privacy Act 1988 (Cth) and our privacy policy [link]. You can ask to access or correct it at any time.',
        ],
      },
      {
        id: 'provider',
        number: '13',
        heading: 'Who provides your service',
        paragraphs: [
          '13.1 Ready Aim Digital builds and hosts your website, on our own system. We are your point of contact and the business you are contracting with.',
          '13.2 We use third-party suppliers to deliver parts of the service, such as hosting and domain infrastructure. We stay responsible to you for the service either way.',
          "13.3 If our business is sold, restructured or transferred, this agreement may transfer with it, so your site and service keep running without interruption. If that happens we'll tell you who and when. It doesn't change your price, your plan or your rights, and it doesn't affect your assets (clause 3), your export right (clause 5) or your consumer rights (clause 14).",
        ],
      },
      {
        id: 'consumer-rights',
        number: '14',
        heading: 'Your consumer rights',
        paragraphs: [
          '14.1 You may have rights under the Australian Consumer Law that cannot be excluded, including guarantees that our services are provided with due care and skill and are reasonably fit for purpose.',
          '14.2 Nothing in this agreement excludes, restricts or modifies those rights. Our 90-day guarantee, and anything else we promise you, sits on top of them, not instead of them.',
        ],
      },
      {
        id: 'responsibility',
        number: '15',
        heading: 'Our responsibility to you',
        paragraphs: [
          '15.1 Except for your rights in clause 14, which always apply, and to the extent the law allows, our total liability to you for the service is limited to resupplying the affected service, or paying the reasonable cost of having it resupplied.',
          "15.2 We're not liable for loss we couldn't reasonably have foreseen, or for things outside our reasonable control.",
        ],
      },
      {
        id: 'usual-bits',
        number: '16',
        heading: 'The usual bits',
        paragraphs: [
          '16.1 Governing law. This agreement is governed by the law of New South Wales, and the courts of New South Wales have jurisdiction.',
          "16.2 Changes to these terms or your price. We may update these terms, and the build fee or monthly fee for future billing periods, from time to time. We'll tell you in advance. A change never applies to a period you've already paid for, and won't reduce your rights. If you don't accept a change, you can cancel under clause 11.",
          '16.3 Notices. We will use the email address you gave us at signup. Tell us if it changes.',
          '16.4 Severability. If part of this agreement cannot be enforced, the rest still applies.',
          '16.5 Whole agreement. These terms, your plan confirmation and the one-page summary are the whole agreement between us about the service.',
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
