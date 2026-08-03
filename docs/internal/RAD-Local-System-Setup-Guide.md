# RAD Local: System Setup Guide

> Internally (between Hayden and Claude) this product is the WIAD / Website-in-a-Day build. "RAD Local" is the team-facing name. Where this guide says "WIAD" it means the same product.

A sequential, build-as-you-go guide for standing up the RAD Local product channel. Work through it in order. The first client project doubles as the build of your reusable template, so don't try to "finish the template" before you have a real site to extract it from.

---

## The mental model

Three things, kept separate on purpose:

1. **The starter template repo** (`rad-local-starter`) ... one repo you clone for every project. Holds the plumbing and, after client 1, the section library and design tokens.
2. **Per-client site repos** (`rad-site-{client}` for direct clients, `rad-site-{partner}-{client}` for white-label builds) ... one per project, created by cloning the starter.
3. **Per-client working folders** (in Google Drive) ... where Phase 0 research, brand assets and content live as `.md` and source files. This is *not* in the code repo.
Separation matters because research/content (folder) changes per client every time, plumbing (template) almost never changes, and design tokens (template) get re-mapped per client. Mixing them is what makes "repeatable" quietly stop being repeatable.

The build order below front-loads the design-independent plumbing, because that part is safe to template before you've designed anything.

**Build type runs across all of this.** Every site is either a *direct-client* build (carries a "powered by Ready Aim Digital" footer) or a *white-label* build (the partner's brand, zero RAD references in the delivered output). This is a single config flag, not a separate template ... see Stage 1.3. The starter defaults to white-label so RAD branding can never leak onto a partner site by accident; you opt in to RAD attribution on direct-client builds.

---

## Stage 0 ... One-time accounts and tools

Set these up once. Tick them off:

- [ ] **GitHub** organisation account + a `rad-local-starter` repo (private)
- [ ] **Vercel** account, connected to the GitHub org
- [ ] **Resend** account (for contact form email delivery) + verify a sending domain
- [ ] **Node + pnpm** installed locally (pnpm keeps installs fast across many repos)
- [ ] **Astro** ... you'll scaffold this in Stage 1
- [ ] **n8n** (you already self-host) for Phase 0 automation
- [ ] **Tally** account for the intake form
- [ ] **Apify** + **Firecrawl** accounts with API keys
- [ ] **GA4** + **Google Search Console** access (set up per client, but know where it lives)
- [ ] A Google Drive **client template folder** you can duplicate per project
> Version note: Astro, its Vercel adapter, and Tailwind move fast. When a command below installs a package, check the current install command in that tool's docs as you go rather than trusting an exact version string.

---

## Stage 1 ... Build the foundation repo (the plumbing)

This is everything that is *not* design: SEO scaffolding, form handling, schema, legal pages, deploy config, and the build-type/branding switch. It's safe to build now because it doesn't depend on any client's look.

### 1.1 Scaffold the project

```bash
pnpm create astro@latest rad-local-starter
# choose: empty project, TypeScript yes
cd rad-local-starter
pnpm astro add tailwind sitemap vercel
```

`@astrojs/sitemap` gives you automatic `sitemap.xml`. The Vercel adapter lets you run a server endpoint for the contact form while keeping the rest of the site static.

### 1.2 Target file structure

Build toward this. Empty files/folders now, filled as you go:

```
rad-local-starter/
├── CLAUDE.md                 # how Claude Code uses this template (critical, RAD IP, never exported)
├── README.md                 # human setup steps per clone (RAD IP, never exported)
├── .exportignore             # what an on-exit client export excludes
├── astro.config.mjs
├── .env.example              # every env var, with blank values
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── config/
│   │   ├── site.ts           # single source of truth per client
│   │   ├── content.ts        # editable narrative + shared service catalogue
│   │   ├── brand.ts          # build-time attribution (direct vs white-label)
│   │   └── schema.ts         # LocalBusiness schema generator
│   ├── styles/
│   │   ├── tokens.css        # design tokens (the re-skin mechanism)
│   │   └── global.css
│   ├── components/
│   │   ├── sections/         # the section library (filled after client 1)
│   │   ├── ui/               # button, card, accordion, input, Footer
│   │   └── seo/
│   │       ├── BaseHead.astro
│   │       └── SchemaOrg.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── services.astro
│       ├── contact.astro
│       ├── privacy.astro
│       ├── terms.astro
│       ├── 404.astro
│       └── api/
│           └── contact.ts    # form handler -> Resend (server-rendered)
```

### 1.3 The single-config pattern

The whole point of repeatability: one client's details live in **one file**, and everything reads from it. Build `src/config/site.ts` like this:

```ts
export const site = {
  name: "Client Business Name",
  legalName: "Client Pty Ltd",
  url: "https://clientdomain.com.au",
  tagline: "Client tagline.",
  description: "One-line meta description.",
  contact: { phone: "+61 ...", email: "hello@clientdomain.com.au" },
  address: {
    street: "", suburb: "", state: "NSW", postcode: "", country: "AU",
  },
  geo: { lat: 0, lng: 0 },
  openingHours: [ /* schema.org opening-hours strings */ ],
  serviceArea: [ /* towns and regions served */ ],
  social: { facebook: "", instagram: "" },
  images: {
    logo: "/images/logo.svg",
    favicon: "/favicon.svg",
    ogDefault: "/images/og-default.svg",
  },
  locale: "en-AU",
  seo: {
    defaultTitle: "",
    titleTemplate: "%s | Client Business Name",
    defaultDescription: "",
  },
};
```

`schema.ts` reads from this and outputs valid LocalBusiness JSON-LD. `BaseHead.astro` reads from it for titles, meta, canonicals and OG tags. On build day, filling this one file does most of your technical SEO groundwork automatically.

Editable page narrative and the shared service catalogue live in
`src/config/content.ts`. Pages read from that module rather than embedding
client copy or maintaining separate service lists.

Branding is a **separate** build-time concern in `src/config/brand.ts`, so it can never be confused with business details:

```ts
export const brand = createBrandConfig(import.meta.env);
```

The default is `whitelabel` on purpose. A direct build requires
`PUBLIC_BUILD_TYPE=direct`, `PUBLIC_ATTRIBUTION_LABEL` and an HTTP(S)
`PUBLIC_ATTRIBUTION_URL`. Incomplete or unsafe values fail back to white-label.
The `Footer` renders attribution only when the resolved build type is direct.

### 1.4 Design tokens (the re-skin mechanism)

Put tokens in `tokens.css` as CSS variables, *not* hard-coded into Tailwind. This makes them framework-version-proof and lets you re-skin an entire site by editing one file:

```css
:root {
  /* colour */
  --color-primary: #1a1a1a;
  --color-accent: #0066ff;
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #1a1a1a;
  --color-muted: #666666;

  /* type ... two slots only */
  --font-heading: "Font A", sans-serif;
  --font-body: "Font B", sans-serif;

  /* scale */
  --radius: 0.5rem;
  --space-section: 5rem;
  --shadow-card: 0 2px 12px rgba(0,0,0,0.08);
}
```

Map these into Tailwind so utilities and tokens stay in sync. On build day, the approved style guide becomes "edit these ~12 values" and the site re-skins instantly. **This is the mechanism that lets one template produce visually distinct sites.** How the design that fills these values is actually produced is the design phase ... see Stage 4.

### 1.5 Plumbing checklist (build all of this now)

- [ ] `BaseLayout.astro` wraps every page, pulls in `BaseHead` + `SchemaOrg`
- [ ] `BaseHead.astro` ... title, meta description, canonical, OG/Twitter tags, favicon, GA4 snippet (gated behind env var). No "generator" tag or RAD reference in the markup
- [ ] `SchemaOrg.astro` ... injects LocalBusiness JSON-LD from `site.ts` (no RAD in `author`/`sameAs` on white-label builds)
- [ ] `content.ts` ... editable page narrative plus one shared service catalogue
- [ ] `brand.ts` ... build-time attribution, failing safely to `whitelabel`
- [ ] `Footer` ... attribution-aware; renders "powered by Ready Aim Digital" only when `buildType` is `direct`
- [ ] `api/contact.ts` ... validates input, sends via Resend, returns success/error
- [ ] `robots.txt` + auto `sitemap.xml`
- [ ] `privacy.astro` + `terms.astro` ... Australian-appropriate placeholder templates with merge fields
- [ ] `404.astro` (no RAD reference)
- [ ] OG image approach (static default now; per-client image later; no RAD on the white-label default)
- [ ] `.env.example` listing all Resend, GA4 and direct-attribution variables
- [ ] `package.json` `name` kept neutral (no "rad"), so it is export-safe
- [ ] `.exportignore` listing what an on-exit export excludes: `.git`, `CLAUDE.md`, `README.md`, and any internal tooling/docs
### 1.6 Write CLAUDE.md

This file does more for build-day speed than any component. It tells Claude Code how the template thinks. **It is RAD methodology and IP, and is never included in a client export.** Include:

- Where the single config lives and that all business details go there
- That branding/build type lives in `brand.ts`, that the default is `whitelabel`, and what flipping it to `direct` does
- That tokens in `tokens.css` are the only place to change brand styling
- How to compose a page from `sections/` (don't write bespoke layout, assemble blocks)
- What is off-limits (don't touch plumbing, schema, form handler)
- The page list convention and where legal pages live
- The deploy flow (push = Vercel preview)
- That `CLAUDE.md` and `README.md` are RAD IP and excluded from any client export
### 1.7 First deploy

Push to GitHub, import into Vercel, confirm a preview URL builds. Add the env vars in Vercel. Test the contact form end to end (submit -> email arrives). **Don't move on until a form submission lands in an inbox.**

---

## Stage 2 ... Per-client conventions

Lock these naming rules now so project five looks like project one.

**Google Drive working folder** (duplicate your template folder per client):

```
# Direct client
RAD-Local-{ClientName}/
├── 01-intake/          # Tally export, brand assets, logo, photos
├── 02-research/        # Phase 0 .md outputs land here
├── 03-content/         # final copy, page by page
├── 04-style-guide/     # approved tokens + direction
└── 05-handover/        # training guide, credentials, care-plan trigger, export artefact

# White-label client (grouped under the partner)
RAD-Local-{Partner}/{ClientName}/   # same 01-05 structure inside
```

**Code repo:** `rad-site-{client}` for direct clients, `rad-site-{partner}-{client}` for white-label builds, each created by cloning `rad-local-starter`.

**Vercel project:** matches the repo name, linked to that repo.

**Export manifest:** the `.exportignore` from Stage 1.5 travels with every clone. It defines exactly what an on-exit client export contains (their site files only) and what it never contains (`.git`, `CLAUDE.md`, `README`, internal tooling/docs). See Stage 6 for the export step itself.

---

## Stage 3 ... Wire up Phase 0 (the pre-day automation)

Goal: by the time the build day starts, research is done and content is in hand. This runs Day -2 to -1, automatically.

1. **Tally intake form** collects: logo + brand assets, services copy, about copy, testimonials, photos, contact details, opening hours, domain/DNS access, competitors they admire, sector, **and build type (direct client, or white-label + partner name)** so naming and `buildType` are set correctly from the start. Make the heavy content fields required ... this form *is* your hard gate.
2. **n8n workflow** triggered on form submission:
   - Save submission + assets into `01-intake/`
   - Apify actor pulls top-rated businesses in the client's sector
   - Firecrawl scrapes the shortlist
   - Pass scrape output + brand assets to **one consolidated research skill** (see Stage 6) that returns competitive intel + offer positioning + draft style guide / design brief
   - Write outputs to `02-research/` as `.md`
3. **Evening-before human review:** skim the research, chase any missing content. If content is missing, the build day does not start. No exceptions ... this rule is what protects the product margin.
Build this with your staged n8n methodology. It's a 15+ node workflow, so phase it.

---

## Stage 4 ... Run client 1 (build the design on the plumbing)

This is the real first delivery. You're building a full custom site on top of the Stage 1 plumbing.

### The design phase (applies to every client, calibrated here on client 1)

Design is AI-generated from the Phase 0 brief, not hand-designed and not chosen from a fixed menu. The loop is:

1. **Brief** ... Phase 0 research gives you the niche brief (competitor intel, positioning gaps, what the niche needs for SEO and AI-search visibility).
2. **Generate** ... feed a versioned, per-niche prompt (encoding the brief) into whatever AI design tool is currently best. The tool is swappable; the prompt and the output contract are not.
3. **QA gate** ... check the output against the design QA standard (Stage 6) before anything else happens. Objective items are checklisted; "is this genuinely premium and distinct" is a senior sign-off while you calibrate the standard, shrinking toward checklist-only as patterns repeat.
4. **Capture** ... the approved look lands in the fixed contract: `tokens.css` values + Astro sections. This is the only output format, regardless of which tool generated the design.
Day 1, that is the whole design phase: consistent prompt in, QA gate, capture. **Do not pre-build niche recipes, component variants or a motion library now.** Those are a later extraction (same philosophy as the section library in Stage 5), harvested only once volume justifies them. Distinctiveness on day 1 comes from the research driving the prompt, plus tokens and composition; subtle motion is a few tasteful primitives, with per-client bespoke motion reserved as a premium / first-in-niche exception.

### The build

1. Clone `rad-local-starter` -> `rad-site-{client}` (or `rad-site-{partner}-{client}`), link to Vercel
2. Fill `site.ts` and `content.ts` from the intake data. For a direct build,
   set `PUBLIC_BUILD_TYPE=direct`, `PUBLIC_ATTRIBUTION_LABEL` and
   `PUBLIC_ATTRIBUTION_URL`; otherwise leave the fail-safe white-label default
3. Run the design phase above (generate -> QA gate -> capture), mapping the approved look into `tokens.css`
4. **Client call 1** (booked, 20 min): approve style guide + sitemap + messaging
5. Build pages in Claude Code using the `frontend-design` skill + approved tokens. Since the section library doesn't exist yet, you're building sections bespoke this time ... that's expected and fine
6. Run copy through the `humanizer` skill
7. Technical SEO is mostly already done via `site.ts` + plumbing; confirm headings, alt text, image compression, internal links
8. Every push gives a Vercel preview URL
9. **Client call 2:** walkthrough on the live preview, one revision round
10. QA pass (including the white-label leakage gate if applicable), DNS cutover, GA4 + GSC, handover
You now have a shipped site **and** a real design to extract from.

---

## Stage 5 ... Extract the template (do this immediately after client 1)

While it's fresh, harvest the reusable parts back into `rad-local-starter`:

1. Take each section you built and **generalise it** into `components/sections/` ... strip client-specific copy, replace hard-coded colours/spacing with token variables, parameterise content via props
2. Aim for 15 to 20 neutral blocks: 2 to 3 hero variants, services grid, about split, testimonials, FAQ accordion, CTA band, contact form, header/footer, feature rows
3. Move anything reusable in `ui/` (button, card, accordion, input, Footer) up too. Keep the `Footer` attribution-aware so build type stays a single flag
4. Update `CLAUDE.md` to document the new section library and how to compose with it
5. Commit. The starter is now a *full* template, not just plumbing.
From here, every future build feeds one or two improvements back into the starter ... the same compounding loop as your Upwork system. This is also where, over time, recurring design patterns get harvested into reusable niche recipes and a motion library. Let that emerge from real builds; don't pre-build it.

---

## Stage 6 ... The skills to build

**QA skill** ... runs your launch checklist so quality is checklist-driven, not memory-driven. It should verify:

- Responsive at mobile/tablet/desktop breakpoints
- Lighthouse 90+ across the board
- Contact form submits and delivers (confirmed, not assumed)
- All internal/external links resolve, 404 page works
- Favicon, OG image render correctly
- Privacy + terms present and populated
- LocalBusiness schema validates
- GA4 firing, GSC verified, sitemap submitted
- Canonicals, meta, heading hierarchy, alt text present
**Design QA gate** ... runs after design generation, before the build proceeds (see Stage 4). Confirms the AI-generated look meets the RAD premium standard. Objective, checklistable items: responsive behaviour, contrast/accessibility, performance budget (so it can still hit Lighthouse 90+), `prefers-reduced-motion` honoured, coherent type and spacing scale, no obviously templated or generic tells. Plus, while the standard is being calibrated, a senior taste sign-off. Codify recurring judgments back into the generation prompt (negative constraints) and this checklist over time, so the senior touch shrinks.

**White-label leakage gate** (runs on every white-label build, before launch and again over any export). Confirms there is no RAD reference in: the footer, any `generator`/meta tag, HTML comments, schema `author`/`sameAs`, OG image defaults, the 404 page, robots/sitemap host references, the Resend "from" address and sending domain, favicon defaults, the visibility of the GA4 property's account, and `package.json`. A clean footer with a `<!-- built by RAD -->` comment still fails.

**Export step** ... when a client requests their files on exit, the export is a defined build artefact, not a hand-zipped folder. Produce the zip from `.exportignore` (their site files only; excludes `.git`, `CLAUDE.md`, `README`, internal tooling/docs), run the white-label leakage gate over the finished zip, then hand over. The methodology and optimisation framework never leave RAD.

**Consolidated research skill** ... the single pass that replaces the four-handoff chain. Takes Firecrawl scrape output + brand assets, returns competitive intel + offer positioning + draft style guide / design brief as one `.md` set. Called by the n8n Phase 0 workflow.

---

## Stage 7 ... The repeatable loop (client 2 onward)

Once the template is extracted, every project is the same shape:

1. Sign-off -> n8n sends Tally form
2. Form -> Phase 0 research runs automatically -> outputs in working folder
3. Evening before: review, confirm content complete (hard gate)
4. Build day:
   - 9:00 to 10:30 ... direction lock (call 1, map tokens, confirm sitemap)
   - 10:30 to 14:30 ... compose from section library in Claude Code
   - 14:30 to 15:30 ... client review on Vercel preview (call 2, one revision)
   - 15:30 to 17:00 ... QA skill (+ white-label gate if applicable), DNS cutover, GA4/GSC, handover
5. Feed one improvement back into the starter
On-exit exports run on request, not per build: produce from `.exportignore`, scan, hand over (Stage 6).

Off-page presence (GBP etc.) stays a separate workstream as you decided.

---

## Stage 8 ... Demo generator (lead marketing, build when sales needs it, not day 1)

A separate, lightweight machine from the build pipeline. Shared visual DNA, none of the plumbing. Its only job: a lead (or a partner's lead) enters basic details and gets a one-page, watermarked demo that makes them excited about what their site could look like. Marketing, not functionality.

Shape it like this:

1. **One dynamic app, not a per-lead deploy.** A single app takes a config (business name, niche, brand colours, logo, a few services) and renders a one-page site from the same visual layer on the fly, behind a shareable URL. At volume you cannot spin a repo + Vercel project per lead.
2. **Automated personalisation.** The form triggers a fast automated enrichment (pull logo + brand colours, grab a few service lines or photos from their existing site or GBP) and auto-fills. The personalisation is what converts; the automation is what keeps it a marketing cost, not a build cost. Day 1 this can be lighter (form fields only) and get richer over time.
3. **Faithful preview.** Same recipe visual layer as the real product, minus plumbing, plus watermark and expiry. Never fancier than what gets delivered ... a demo that out-dazzles the real site manufactures churn, and in a subscription model retention is the whole game.
4. **Watermark inherits white-label.** Partner-branded or neutral, never RAD. The demo respects `buildType`. The RAD-leakage gate applies to any white-label demo; the functional gates (form delivery, content, schema) do not.
5. **Expiry** (e.g. 7 days): keeps the funnel clean and creates urgency.
6. **Feeds the real build.** The demo form is a lightweight front end of the Tally intake; on conversion, promote the demo config into the real intake rather than re-collecting.
This is deliberately not day-1 scope. Stand up the build pipeline and ship a real client first; build the demo generator when the sales motion actually needs it.

---

## What to do first (your real-time run)

In order, so each step unblocks the next:

1. Stage 0 accounts (30 min)
2. Stage 1 plumbing repo through to a working deployed contact form, including the `brand.ts` build-type switch defaulting to white-label and the `.exportignore` manifest ... this is the biggest one-time investment, do it properly
3. Stage 2 folder/naming conventions
4. Then start client 1: Phase 0 can be run manually the first time (you don't need n8n wired before you can deliver). Wire Stage 3 automation once you've felt the manual flow once. The design phase here is just prompt + QA gate + capture ... keep it that simple
5. Ship client 1, extract the template (Stage 5), build the skills (Stage 6)
6. Client 2 runs the full loop
Doing Phase 0 manually for client 1 is deliberate ... you'll design a much better n8n workflow once you've felt where the friction actually is.

The demo generator (Stage 8) is a later, parallel build. It does not block client delivery ... stand up the pipeline and ship client 1 first, then build it when sales needs it.
