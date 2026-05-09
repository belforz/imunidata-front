/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_IMUNIDATA_BASE_URL: string,
    readonly VITE_IMUNIDATA_DOCS: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

export interface FieldProps {
  label: string
  placeholder?: string
  type?: string
  options?: string[]
  className?: string
}