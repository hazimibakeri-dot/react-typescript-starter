/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional display name used in the header and document title. */
  readonly VITE_APP_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
