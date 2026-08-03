# Open decisions and implementation notes (Stage 1)

Material ambiguities and judgement calls made while executing
`IMPLEMENTATION_PACKET_1.md`, per its instruction to record rather than
invent product or commercial decisions. `docs/internal/RAD-Local-Decisions.md`
remains binding; nothing below overrides it.

## Tailwind 4 uses CSS-first configuration

The Setup Guide and ClickUp Stage 1 task require Tailwind and require the
design tokens to be mapped into it. Astro's current official guidance for
Astro 5.2 and later installs Tailwind 4 through the `@tailwindcss/vite`
plugin. Tailwind 4 uses CSS-first theme configuration, so no legacy
`tailwind.config.mjs` file is needed.

The twelve brand values remain ordinary CSS variables in the `:root` block
of `tokens.css`. An `@theme inline` block aliases them into Tailwind's theme
namespaces without duplicating their values. This keeps `tokens.css` as the
binding re-skin mechanism while satisfying the required Tailwind mapping.

## Default OG image is an SVG placeholder

`public/images/og-default.svg` is a placeholder default Open Graph image.
Some social platforms (notably Facebook/LinkedIn crawlers) do not reliably
render SVG `og:image` values. This satisfies the packet's "static default
now" requirement but should be replaced with a raster (PNG/JPG) default, or
a per-client image, before any real launch. Noted in `README.md` as a known
limitation.

## TypeScript pinned to the 6.x line

`pnpm add` resolved TypeScript 7.0.2 as latest by default. `@astrojs/check`
(used for `pnpm check`) currently declares a peer dependency of
`^5.0.0 || ^6.0.0`. TypeScript was pinned to `^6` to keep `astro check`
working without an unmet-peer warning. Revisit when `@astrojs/check`
supports TypeScript 7.

## Browser-level smoke tests deferred

The packet allows browser-level smoke tests "only if they can run reliably
in this environment without bloating the packet," otherwise documented as
the next QA packet. No Playwright/browser automation tooling is installed
in this environment and none was added. Stage 1 checks are limited to
`astro check`, Vitest unit/component tests, and a production build plus a
static-output RAD-leakage scan. See
`docs/internal/IMPLEMENTATION_REPORT_STAGE_1.md` for what a follow-up QA
packet should add (Lighthouse scores, real multi-viewport rendering, a true
end-to-end Resend send).
