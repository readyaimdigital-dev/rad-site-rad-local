# Source status

## Available and inspected

- RAD Local System Handover Brief, version 1.1, dated 23 June 2026.
- `RAD-Local-System-Setup-Guide.md`, supplied by Hayden on 2 August 2026.
- `RAD-Local-Decisions.md`, last updated 2 July 2026 and supplied by Hayden on 2 August 2026. This is the binding source when requirements conflict.
- ClickUp RAD Local list and detailed Stage 0, 1, 2, 4, 5 and 6 task descriptions.
- User confirmation on 2 August 2026 that Hermes owns implementation and the current developer may be used for verification.

## Not yet available

- Confirmed Brickrite repository.

## Safe implementation rule

Follow `RAD-Local-Decisions.md` first, then the Setup Guide, then the handover brief and ClickUp requirements. Record genuine ambiguities rather than inventing them.

## Current external gates

- Create and push the private GitHub starter repository after code acceptance.
- Create the Vercel project, configure server-only variables and deploy.
- Configure the Vercel contact-endpoint rate limit.
- Confirm a real contact-form message lands in the approved inbox.
- Obtain the Brickrite repository before the later Brickrite packet begins.
