/// <reference types="vite/client" />

// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_BASE_HOME_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
