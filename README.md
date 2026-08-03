# rad-local-starter

Reusable Astro starter for RAD Local (Website-in-a-Day) client sites. One
template, cloned per client; business facts and editable narrative live in
typed config files, while direct attribution is build-time configuration. See `CLAUDE.md` for the build conventions and
`docs/internal/` for the product methodology (neither ships in a client
export; see `.exportignore`).

## Stack

- [Astro](https://astro.build), static-first
- [Vercel](https://vercel.com) hosting, adapter for the contact-form endpoint
- [Resend](https://resend.com) for contact-form email delivery
- [Tailwind CSS 4](https://tailwindcss.com) through its official Vite plugin
- TypeScript (strict) and [Vitest](https://vitest.dev) for tests

## Local setup

```bash
pnpm install
cp .env.example .env
# fill in .env, see "Environment variables" below
pnpm dev
```

## Environment variables

Copy `.env.example` to `.env` and fill these in. Server-only values never
reach browser output. Astro treats every `PUBLIC_`-prefixed value as public
build configuration, so never put a secret in one of those variables.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend API key used to send contact-form email. |
| `CONTACT_TO_EMAIL` | Mailbox that receives contact-form submissions. |
| `RESEND_FROM_EMAIL` | Verified Resend sending address for this client's domain. |
| `PUBLIC_GA4_ID` | GA4 measurement ID. Leave blank to disable analytics entirely; no script renders when unset. |
| `PUBLIC_BUILD_TYPE` | Use `direct` only when attribution is required. Any other value resolves to white-label. |
| `PUBLIC_ATTRIBUTION_LABEL` | Direct-build attribution label. Required only for a direct build. |
| `PUBLIC_ATTRIBUTION_URL` | Direct-build HTTP(S) attribution URL. Required only for a direct build. |

## Per-client configuration

Before building a client site, edit:

- `src/config/site.ts`: business name, description, contact details,
  address, service area, opening hours, social links, images and default
  SEO copy. Everything else (page titles, canonical URLs, OG tags, sitemap
  host, LocalBusiness schema) derives from this file.
- `src/config/content.ts`: editable page narrative and the shared service
  catalogue. Keep routine client copy changes out of page markup.
- Environment variables: use `PUBLIC_BUILD_TYPE=direct` together with both
  attribution variables for a direct build. Missing or unsafe values fail
  back to white-label. Do not hard-code agency identity in shippable source.
- `src/styles/tokens.css`: the core CSS variables that re-skin the site,
  including its responsive type scale, plus their Tailwind 4 theme aliases.
  Change values only in the `:root` token block.

## Checks

```bash
pnpm check          # Astro + TypeScript type checking
pnpm test           # Vitest unit tests
pnpm build          # production build to dist/
pnpm check:leakage  # scan dist/ for RAD references (run after pnpm build)
pnpm export:client  # build an archive from the filtered Git index snapshot
```

Run `pnpm build && pnpm check:leakage` before treating any white-label
build as launch-ready.

## Contact form

`src/pages/contact.astro` renders `ContactForm.astro`, which posts JSON to
`src/pages/api/contact.ts` (a server-rendered endpoint; `prerender = false`
so it runs on Vercel even though the rest of the site is static). The
endpoint validates and normalises input in `src/lib/contact-validation.ts`,
rejects nothing silently except confirmed honeypot spam, and sends via
Resend through `src/lib/send-contact-email.ts`. Errors returned to the
browser are generic and server logs contain a fixed message without provider details.

Before launch, confirm a real submission arrives in the configured inbox.
This cannot be verified in this environment without live Resend credentials
(see `docs/internal/IMPLEMENTATION_REPORT_STAGE_1.md` for what remains
unverified).

## Deployment (Vercel)

1. Push the client repo to GitHub.
2. Import the repo into Vercel.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL`,
   `PUBLIC_GA4_ID` (if used), and the three direct-attribution variables
   when the build is direct. Leave direct attribution unset for white-label.
4. Every push produces a preview deployment URL.
5. Do not cut over DNS until the contact form has delivered a real email
   end-to-end and, for white-label builds, `pnpm check:leakage` passes
   against the production build.

## Known limitations at Stage 1

- The default OG image (`public/images/og-default.svg`) is an SVG
  placeholder. Some social platforms do not render SVG `og:image` values;
  replace with a raster (PNG/JPG) default or per-client image before
  launch.
- No browser-level (Playwright/Lighthouse) smoke tests are included in this
  packet; see `docs/internal/IMPLEMENTATION_REPORT_STAGE_1.md` for why and
  what the next QA packet should add.
- `src/components/sections/` is intentionally empty; the section library is
  extracted from the first real client build, not pre-built here.
