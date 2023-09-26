/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
	// base: "/subpath/",
	plugins: [
		react(),
		viteMockServe({
			ignore: /^\\_/,
			mockPath: "mock",
			enable: true,
		}),
	],
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["./src/setupTests.ts"],
	},
	server: {
		port: 3000,
	},
	build: {
		outDir: "build",
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
					antd: ["antd", "@ant-design/icons"],
				},
			},
		},
	},
});
