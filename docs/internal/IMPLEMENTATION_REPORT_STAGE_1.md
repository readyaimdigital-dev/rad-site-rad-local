# Stage 1 implementation report

Date: 3 August 2026

Status: Local implementation and acceptance checks pass. GitHub publication,
Vercel deployment, Vercel rate limiting and real Resend inbox delivery remain
external gates at the time of this report.

## Authority and scope

The implementation followed this precedence:

1. `docs/internal/RAD-Local-Decisions.md`
2. `IMPLEMENTATION_PACKET_1.md`
3. `docs/internal/RAD-Local-System-Setup-Guide.md`
4. `docs/internal/RAD_Local_System_Handover_Brief.txt`

No client data or production secret was committed.

## Implementation delivered

- Astro 7 with TypeScript, Vercel adapter, sitemap support and Tailwind 4.
- Home, About, Services, Contact, Privacy, Terms and 404 pages.
- `site.ts` as the source of business facts.
- `content.ts` as the source of editable narrative and the shared service catalogue.
- `brand.ts` as the fail-safe build-time direct or white-label switch.
- LocalBusiness JSON-LD, canonical tags, Open Graph, Twitter metadata, robots and sitemap.
- Resend contact endpoint with validation, honeypot handling and safe error responses.
- Design-token styling with all UI colours sourced from tokens.
- Full Vercel-output leakage scanning.
- A clean client source-export command and exclusion manifest.

## Independent review corrections

Three independent reviewers blocked the first candidate. Their findings were
resolved before publication:

- Removed an unintended test route from production output.
- Added Tailwind 4 using the official Vite integration.
- Prevented JSON-LD script breakout.
- Validated GA4 IDs before rendering and serialised the accepted ID safely.
- Broadened `.gitignore` to protect all common `.env*` files except `.env.example`.
- Added a 16 KB application request-body limit.
- Rejected control characters in names used in email subjects.
- Replaced raw provider exception logging with a fixed safe log line.
- Re-enabled native browser form validation.
- Excluded noindex legal templates from the sitemap.
- Made the HTML language follow `site.locale`.
- Declared Node and pnpm versions.
- Removed remaining hard-coded UI colours.
- Moved editable page copy and services out of page markup.
- Removed agency identity from shippable source.
- Excluded scripts, tests, internal docs, build artefacts and secrets from client exports.
- Expanded leakage scanning from HTML only to all relevant deployable text files.
- Changed the request-size guard to stop streamed reads just after the 16 KB limit.
- Rejected C0, DEL and C1 controls in the user-controlled Reply-To address.
- Detected standalone agency initials and identity-bearing filenames.
- Exported only the Git index snapshot and rescanned the finished ZIP.
- Removed unavailable commands from the exported package manifest.
- Removed duplicated sample-business identity from reusable public assets.
- Corrected operator documentation to match the environment-driven build interface.
- Moved Privacy and Terms narrative and merge fields into the typed content layer.
- Replaced the sample-initial favicon with a neutral reusable asset.

## Local acceptance evidence

All commands were run from the repository root.

### Dependency and static checks

- `pnpm install --frozen-lockfile --offline`: passed.
- `pnpm check`: 0 errors, 0 warnings and 0 hints across 45 files.
- `pnpm audit --prod`: no known vulnerabilities.
- `git diff --check`: passed.

### Automated tests

- `pnpm test`: 57 of 57 tests passed across 12 files.
- Coverage includes brand switching, rendered footer states, JSON-LD safety,
  central content references, sitemap filtering, GA4 validation, contact
  validation, request limits, safe logging, Resend payloads and form markup.

### Production build and white-label output

- `pnpm build`: passed using `@astrojs/vercel`.
- Expected static pages and the server contact endpoint were produced.
- Privacy and Terms are absent from the sitemap because they are noindex templates.
- Contact remains present in the sitemap.
- `pnpm check:leakage`: 0 matches across 75 deployable text files.
- The scan covers HTML, JavaScript, server modules, CSS, JSON, XML, SVG, text and maps.
- No generator metadata was found in built HTML.

### Negative build-mode tests

- A script-breaking GA4 value rendered no analytics script and no executable
  breakout in HTML.
- Vite may retain a `PUBLIC_` value as encoded data in a server bundle. It is
  public configuration, was not executed and did not reach rendered markup.
- A direct build using explicit attribution variables rendered the expected
  footer attribution.
- The white-label leakage gate failed against that direct build as expected.
- A final default build was then produced and passed the leakage gate again.

### Client source export

- `pnpm export:client rad-local-stage-1`: passed.
- Archive contained 38 client source files.
- Archive contained 0 internal tooling or test paths.
- Archive contained 0 forbidden agency references.
- `.env.example` was retained while real environment files were excluded.
- Two untracked canaries, including `ready-aim-digital-note.txt`, were excluded.
- The exported package installed offline with its frozen lockfile, typechecked and built.
- The exported manifest exposed only commands whose implementation was present.

### Live HTTP smoke test

A temporary local Astro server was exercised and then stopped:

- `/`, `/about`, `/services`, `/contact`, `/privacy`, `/terms` and `/robots.txt`: 200.
- Unknown route: 404.
- Malformed JSON contact request: 400.
- Oversized contact request: 413.
- Honeypot submission: silent 200 without sending.
- Valid submission without server credentials: safe 502 with no secret leakage.

## Security boundary

Repository controls now provide input validation, request-size control,
honeypot handling, safe logs and origin protection supplied by Astro.

A Vercel firewall rate limit for `/api/contact` remains an external deployment
configuration gate. The repository deliberately does not claim that an
in-memory serverless rate limiter would provide reliable distributed quota
protection.

## External acceptance gates

The following must be evidenced before Stage 1 is called complete:

- Initial commit pushed to the private GitHub repository.
- Real Vercel preview deployment.
- Server-only Resend variables configured in Vercel.
- Vercel rate limit configured for `/api/contact` if supported by the account plan.
- Real contact-form submission delivered to the nominated inbox.
- Browser visual smoke check on the Vercel preview.

## Deferred launch work

- Replace the placeholder OG SVG with an approved raster social image.
- Replace fictional client copy and all legal merge fields.
- Run Lighthouse and multi-viewport visual QA.
- Configure client GA4 and Search Console when a real client build exists.
