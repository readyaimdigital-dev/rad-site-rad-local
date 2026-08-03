/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string | undefined;
  readonly CONTACT_TO_EMAIL: string | undefined;
  readonly RESEND_FROM_EMAIL: string | undefined;
  readonly PUBLIC_GA4_ID: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
