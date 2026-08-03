# CLAUDE.md

This file tells Claude Code (or any future agent) how this template thinks.
It is RAD internal methodology and is never included in a client export
(see `.exportignore`).

## The configuration boundary

`src/config/site.ts` is the single source of truth for a client's business
facts: name, contact details, address, opening hours, service area, social
links and default SEO copy. `src/config/content.ts` holds editable page
narrative and the shared service catalogue. `BaseHead.astro` and `schema.ts`
read from `site.ts`, while pages read narrative from `content.ts`. Never
duplicate a business fact or editable service list inside page markup.

## Build type default

`src/config/brand.ts` resolves build-time environment values into
`buildType: "direct" | "whitelabel"`. **The default is `whitelabel`.** A
direct build requires `PUBLIC_BUILD_TYPE`, `PUBLIC_ATTRIBUTION_LABEL` and a
safe HTTP(S) `PUBLIC_ATTRIBUTION_URL`. Missing or unsafe values fail back to
white-label. Never hard-code agency identity in shippable source.

## White-label cleanliness

When `buildType` is `"whitelabel"` (the default), the rendered output must
contain zero RAD references: no footer attribution, no `generator` meta tag,
no RAD in HTML comments, schema `author`/`sameAs`, OG defaults, the 404 page,
robots/sitemap host references, or `package.json`. The Footer component is
the only place attribution renders, and only when `buildType` is `"direct"`
(via `getFooterAttribution()` in `brand.ts`). Do not add RAD references
anywhere else in `src/`. Astro's generator meta tag is stripped by the build hook in
`astro.config.mjs`; do not remove that hook.

Run `pnpm build && pnpm check:leakage` to scan built output for RAD strings
before treating a white-label build as ready.

## Token contract

`src/styles/tokens.css` holds the compact CSS variable set that re-skins a site:
colour, two font slots, radius, section spacing, card shadow and container
width. This is the *only* place brand styling changes. Do not hard-code
colours, fonts or spacing values in components or pages. Tailwind 4 is
installed through its official Vite plugin, and `tokens.css` maps the root
tokens into theme aliases such as `text-brand-primary`, `bg-brand-surface`
and `font-brand-heading`. Use those utilities or the underlying
`var(--token-name)` values without introducing a second source of truth.

## Composing pages

`src/components/sections/` is the section library, extracted from the first
real client build (Stage 5 of the Setup Guide) and empty in this starter.
Once populated, compose pages from `sections/` rather than writing bespoke
page layout. `src/components/ui/` holds framework-agnostic primitives
(Button, Card, Header, Footer, ContactForm) safe to reuse across any client.

## What is off-limits

Do not touch without a reason tied to an actual Stage 1 requirement:

- `src/config/schema.ts` (LocalBusiness JSON-LD generator) and
  `src/components/seo/SchemaOrg.astro` / `BaseHead.astro` (SEO plumbing).
- `src/pages/api/contact.ts`, `src/lib/contact-validation.ts` and
  `src/lib/send-contact-email.ts` (the form handler and its validation).
- `astro.config.mjs`.
- `.exportignore` and `.env.example`.

## Pages and legal content

The page list is Home, About, Services, Contact, Privacy, Terms and 404.
Privacy and Terms are placeholder templates with a visible "template notice"
banner and bracketed merge fields (e.g. `[Business Legal Name]`); they must
be reviewed and populated with client-specific, legally reviewed content
before launch. Do not remove the template notice until that review has
happened.

## Deploy flow

Push to the client's `rad-site-{client}` (or `rad-site-{partner}-{client}`)
repo on GitHub; Vercel builds a preview URL per push. Environment variables
(`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL`, `PUBLIC_GA4_ID`,
and the direct-attribution variables)
are set in the Vercel project, never committed. Do not move to launch until
a real contact-form submission has been confirmed landing in the target
inbox.

## RAD IP boundary

`CLAUDE.md`, `README.md` and everything under `docs/internal/` are RAD
methodology and must never be copied into a client export. The central
`rad-skills` repository is separate from this starter; no skill files are
ever copied into this repository or a client export.
