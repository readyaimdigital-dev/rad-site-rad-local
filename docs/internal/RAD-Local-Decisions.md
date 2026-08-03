# RAD Local ... Locked Decisions

> Internally (between Hayden and Claude) this product is the WIAD / Website-in-a-Day build. "RAD Local" is the team-facing name. Where this file says "WIAD" it means the same product.

This file holds the current binding decisions for the RAD Local build. Treat everything here as settled. Do not reopen any of it unless Hayden raises it. Update this file (rather than the project instructions) as decisions change, so it can be swapped out cleanly.

**Last updated:** 2 July 2026

---

## Stack

- **Framework:** Astro, static-first.
- **Hosting / deploy:** Vercel (preview URL per push).
- **Contact form email:** Resend.
- **Version control:** GitHub.
- **Phase 0 automation:** n8n + Tally (intake) + Apify + Firecrawl.
- **Analytics / search:** GA4 + Google Search Console, set up per client.
- **Direct-client GA4/GSC account:** `analytics@readyaim.digital`. Dedicated to RAD Local direct clients only ... do not add other RAD service lines or clients to it, and do not reuse `seo@ready-aim.digital` (that account stays with the existing website build client base; the two are kept separate on purpose).
- **Recovery for that account sits at the domain/hosting level** (`readyaim.digital`), controlled by RAD via the host server, not an individual's personal recovery details. No Google Workspace seat is required for this account.
- **This account is the single standing user added to every direct client's GA4 property and GSC property**, giving one consistent connection point for AI/reporting tooling across the RAD Local direct-client base.
- **Known cleanup required before first RAD Local use:** as of this decision, `analytics@readyaim.digital` still has 3 legacy (unrelated, former) clients attached. Audit and remove these before adding the first RAD Local direct client, so the account starts clean.
- **White-label GA4/GSC structure is a separate, deferred decision.** White-label builds need to sit under each partner's own domain, not this account. Revisit when the first white-label build reaches this stage.
- Sites are **custom-coded, not WordPress.** They sit outside the standard SiteGround/WordPress care-plan model.

## Architecture

- **Two repos + one folder:**
  - One starter template repo: `rad-local-starter`
  - Per-client site repos: `rad-site-{client}` for direct clients, `rad-site-{partner}-{client}` for white-label partner builds (this groups a partner's work and keeps partners siloed from each other).
  - Per-client Google Drive working folders (research / content / assets), kept out of the code repo.
- **Plumbing is templated first; the section library is extracted after client 1.** Client 1 is a full bespoke build on top of the plumbing; its sections are then generalised back into the starter.
- **Design tokens in `tokens.css` (CSS variables) are the re-skin mechanism.** Editing ~12 values re-skins a whole site.
- **One config file (`site.ts`) is the single source of truth** for all business details and drives technical SEO automatically.

## Skills layer (central repo)

- **Skills live in one central, versioned repo (`rad-skills`), the single source of truth.** Every RAD skill (the SEO and UI/UX hardening passes, humanizer, and the RAD business/ops skills) is maintained here and nowhere else. Upgrade a skill once, in this repo, and every future build inherits the latest. This is the Tier 1 "build once, reuse forever" layer that sits above the per-product, per-client split.
- **The skills repo is separate from `rad-local-starter` and is never committed into a client clone or export.** Skills are the highest-value RAD IP. They are kept out of every client repo by construction ... the same clean-by-construction discipline as white-label leakage ... so a finished site or an export can never carry the method. Skills live in each IDE's global skills directory, not inside any project.
- **Open Agent Skills standard (`SKILL.md`), so one skill folder runs unchanged across IDEs.** Claude Code and Antigravity both read the same format. A skill authored once is callable in either, with no per-tool rewrite. The method stays genuinely tool-agnostic.
- **Skills are synced into each IDE's global skills directory, not read live from the repo.** The repo is upstream; a symlink (or pull) into each IDE's global skills path means one update propagates to both Claude Code and Antigravity. Sync targets differ by skill type: the build/harden skills (SEO audit, UI/UX harden, frontend, humanizer) sync to both IDEs; Claude-only business/ops skills (proposals, briefs, account manager, and the like) sync to Claude only.
- **Skill upgrades affect future builds and re-runs only, never a deployed client site.** A shipped site is a frozen snapshot and does not change because a central skill was later improved. Skills are method, not site content, so they are allowed to evolve centrally without touching live sites. This is consistent with the frozen-snapshot rule.
- **One canonical skill per capability; duplicates are retired.** Where the same capability exists on both the Claude and Antigravity sides (e.g. two SEO skills, two UX skills), one is nominated canonical and the other retired before centralising, so versions cannot drift. The per-capability nomination is a setup task (Guide Stage 0), not an open decision.

## Design phase

The tokens line above describes how a design *propagates* across a site cheaply. This section describes how the design itself gets *produced*.

- **Design is AI-generated from a research-led brief, not hand-designed and not chosen from a fixed menu.** Phase 0 research produces the brief (competitor intel + niche opportunities + what the niche needs for SEO and AI-search visibility). That brief drives design generation in whatever AI tool is currently best, then polished (e.g. in Claude Code).
- **The generation tool is swappable; the output format is fixed.** Whatever tool generates the look, the result lands in the canonical contract: design tokens in `tokens.css` + Astro section components. Tools change as better models appear; the contract does not. This is what lets the design phase improve over time without re-architecting anything.
- **Consistency comes from consistent prompts + a QA gate, not from constraining the design.** A versioned, per-niche prompt (encoding the research) drives generation. The output is then checked against a design QA standard before the build proceeds. This is the day-1 mechanism. Keep it simple.
- **The design QA gate has a taste check, not just objective checks.** Objective items (contrast/accessibility, responsive behaviour, performance budget, reduced-motion support, coherent type and spacing scale) are checklist-driven. "Does this actually look premium and distinct" is a senior sign-off while the standard is being calibrated. As patterns repeat, that judgment is codified back into the prompt (negative constraints) and the checklist, so the senior touch shrinks toward zero over time.
- **Distinctiveness is driven by the research, not bolted on.** Because each client's research surfaces a different competitive set and different positioning, an honestly research-led design diverges naturally. "Backed by niche research" and "doesn't look like the same site" are the same lever, and that lever is also the sales story to partners.
- **Four layers of visual distinctiveness** (cheapest to richest): tokens (colour/type/spacing), composition (sections + order), bespoke sections, and a craft/motion layer (subtle, tasteful motion ... the "beyond DIY" signal). Day 1 leans on tokens + composition + a few tasteful motion primitives. Per-client bespoke motion (e.g. AI-generated motion assets) is a premium / first-in-niche exception, never the high-volume default.
- **Durability over trend.** Premium feel that survives 6+ months comes from restraint and fundamentals (type, space, contrast, performance, accessibility) plus a thin layer of purposeful motion, not from the effect that is fashionable this quarter.
- **Recipe / component / motion libraries are a later extraction, not a day-1 build.** Exactly like the section library (extracted after client 1), recurring design patterns get harvested into reusable niche recipes, section variants and a motion library only once volume justifies it. Do not pre-build this. Prompts + QA first; libraries later.

## Build types, white-label and export

- **One template, two build types, branding by config.** There is a single starter (`rad-local-starter`). Direct-client vs white-label is a `buildType` flag in the per-client config (`brand.ts`), not a forked template. Never fork the template per partner ... that breaks the improve-once loop and is the thing that makes "repeatable" quietly stop being repeatable.
- **Direct-client sites** carry a "powered by Ready Aim Digital" footer. **White-label partner sites** carry the partner's brand and contain zero RAD references anywhere in the delivered output.
- **Default to clean.** The starter defaults to white-label (`buildType: "whitelabel"`, no RAD anywhere). RAD attribution is opt-in per direct-client build. Fail-safe direction: a forgotten flag loses your own footer credit (trivial to fix) rather than leaking RAD onto a partner site (breaks the entire white-label promise).
- **RAD holds and hosts the code.** The repo is never shared with the client or partner. RAD builds and hosts invisibly under the partner's brand.
- **On-exit export.** The end client (a direct client, or a partner's client) may request their site files at any time on exit. This is a one-off zipped export, not repo access.
- **"Site files" means that client's specific site only.** The export contains only the files that make up their website. None of the RAD methodology, optimisation framework, build system or internal docs (`CLAUDE.md`, `README`, tooling) is ever passed on. That is RAD IP and stays with RAD.
- **Clean by construction, not sanitised on the way out.** For white-label builds, every file in the repo tree that could ship in an export (config, `package.json` name, code comments) is kept RAD-clean from the start. Internal infrastructure that never enters the zip (GitHub repo name, Vercel project name, Drive folder) may stay RAD-branded.
- **The export is a deliberate build artefact.** It is produced from a defined manifest (`.exportignore`), excludes `.git` (commit history is a leak vector), excludes methodology and internal docs, and passes a RAD-leakage scan before handover. Never zip the working folder by hand.

## SEO

- **Technical SEO is built into the template, not bolted on at the end.** It must be complete by launch.
- **Off-page presence (GBP etc.) is a separate workstream**, not part of the build day.
- **GA4/GSC account management for direct clients:** see the Stack section above (`analytics@readyaim.digital`).

## Hard gates

1. No completed intake form / content = no build day.
2. The contact form must deliver email end-to-end before any launch.
3. White-label builds pass a RAD-leakage scan before launch, and any on-exit export passes the same scan before handover.
4. AI-generated design passes the design QA standard before the build proceeds. Senior sign-off while the standard is being calibrated; checklist-driven thereafter.

## Client interaction

- **Two booked client calls on build day**, each with strict scope:
  - Direction lock (morning): style guide + sitemap + messaging.
  - Review (afternoon): walkthrough on the live Vercel preview, one revision round.
- **Async approval is banned.** It turns one day into five. Approvals happen on booked calls.
- Anything beyond agreed scope goes to a post-launch backlog, not into the day.

## Rollout sequencing

- **Phase 0 runs manually for client 1**, then gets wired in n8n once the friction is understood.
- Each completed build feeds one improvement back into the starter template.

## Build-day shape (repeatable loop, client 2 onward)

Sign-off -> n8n sends Tally form -> Phase 0 research runs automatically -> evening-before content review (hard gate) -> build day:

- 9:00 to 10:30 ... direction lock (call 1, map tokens, confirm sitemap)
- 10:30 to 14:30 ... compose from section library in Claude Code
- 14:30 to 15:30 ... client review on Vercel preview (call 2, one revision)
- 15:30 to 17:00 ... QA skill + DNS cutover + GA4/GSC + handover

## Demo generator (lead marketing, not the product)

- **The demo is a separate machine from the build pipeline.** It shares the visual DNA but none of the plumbing. Demo concerns never enter the production starter, and production rigour never slows the demo.
- **Marketing only, not functionality.** A basic form input spins a one-page, watermarked demo that shows a lead their brand looking professional. No working form delivery, schema, GA4, legal pages or DNS. Its only job is to make a lead excited.
- **Dynamic app, not a per-lead deploy.** At volume you cannot spin a repo + Vercel project per lead. One demo app takes a config (business name, niche, brand colours, logo, a few services) and renders a one-page site from the same visual layer on the fly, behind a shareable URL.
- **Faithful preview, scaled down.** The demo uses the same recipe visual layer as the real product, minus plumbing, plus watermark and expiry. Never fancier than what gets delivered ... a demo that out-dazzles the real site manufactures churn, and in a subscription model retention is the whole game.
- **Watermark inherits white-label.** A partner-sent demo is visible output, so the RAD-leakage rule applies in full: partner-branded or neutral watermark, never RAD. The demo respects `buildType` exactly like a real build.
- **Demos expire** (e.g. 7 days): keeps the funnel clean at volume and gives the sales motion a deadline.
- **The demo feeds the real build.** The demo form is a lightweight front end of the Tally intake; on conversion the demo config is promoted into the real intake rather than re-collected. One data spine, demo through to delivery.
- **Hard gates:** the demo skips the functional gates (form delivery, content completeness, schema) because it is not a working site, but the RAD-leakage gate still applies to any white-label demo.
- **Not day-1 scope.** Stand up the build pipeline and ship a real client first. Build the demo generator when the sales motion actually needs it.

## Client self-serve editing (higher-tier feature)

- **Constrained client editing is a locked product decision, offered as a higher-subscription tier.** Higher-tier clients can self-serve a whitelist of content fields (e.g. hours, phone, prices, hero copy, a photo swap, service descriptions). This answers the "can I edit my own site?" objection truthfully at the point of sale, deflects low-value changes from the support queue, and gives clients a felt sense of control that justifies the higher tier. It is constrained editing of exposed fields, not handing over the keys.
- **The architecture is config-native, not a runtime CMS.** A RAD-hosted dashboard where a client logs in, edits whitelisted fields, and the dashboard commits those changes to that client's `rad-site-{client}` config / content layer via the GitHub API, triggering a Vercel rebuild and deploy. The "frozen template" is the existing Astro stack, the "content slots" are the config schema, and the safety guarantee ("only content changes, never structure") holds by construction because the editable surface is a known schema, not arbitrary HTML.
- **Reject the ingest / runtime-Guardian model.** The blueprint pattern (ingest rendered HTML, retrofit editable slots, validate edits with a runtime Guardian, Node + Express + Mongo) solves a problem we have already solved at build time. We start from structured content and a locked design, so we do not need runtime structural validation. Git history plus Vercel immutable deploys give versioning and one-click rollback for free. Keep the blueprint's two-layer mental model (one dashboard, many client sites); discard its implementation.
- **IP protection holds.** The repo is never shared. The dashboard edits on the client's behalf via the API, so RAD continues to hold and host the code exactly as for every other build.
- **Day-1 requirement: keep client-editable copy cleanly separable from section markup.** When the section library is extracted (Setup Guide Stage 5), content lives as props / data, never baked into components. This is already the intended approach; the editing tier is one more reason to hold the line. This is the only thing that must be true now.
- **The dashboard respects `buildType` like everything else.** A partner's client cannot log into a "Ready Aim Digital" editor ... that leaks RAD onto a white-label relationship as surely as a footer would. The editing surface must be partner-branded or neutral, never RAD. Design this in, do not retrofit it.
- **Build trigger is revenue-linked, not cost-linked.** Unlike the other deferred pieces, the trigger is the first higher-tier sale: build the dashboard when there is a paying client who needs it to exist. The whitelist of editable fields is itself extracted from what clients actually ask to change, same philosophy as the section library and recipes. Until then, sales can speak to it truthfully because the architecture supports it cheaply and the decision is locked. Do not pre-build the dashboard.
