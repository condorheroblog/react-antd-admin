/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
	readonly VITE_BASE_HOME_PATH: string
	readonly VITE_APP_VERSION_MONITOR: "Y" | "N"
	readonly VITE_GLOB_APP_TITLE: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
