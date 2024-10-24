/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import dayjs from "dayjs";
import { defineConfig } from "vite";
import { vitePluginFakeServer } from "vite-plugin-fake-server";
import svgrPlugin from "vite-plugin-svgr";

import { dependencies, devDependencies, name, version } from "./package.json";

const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
};

// https://vitejs.dev/config/
export default defineConfig({
	// eslint-disable-next-line node/prefer-global/process
	base: process.env.NODE_ENV === "development" ? "/" : "/react-antd-admin/",
	plugins: [
		react(),
		vitePluginFakeServer({ enableProd: true }),
		svgrPlugin({
			// svgr options: https://react-svgr.com/docs/options/
			svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
			include: "**/*.svg",
		}),
	],
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["./src/setupTests.ts"],
	},
	server: {
		port: 3333,
		// https://vitejs.dev/config/server-options#server-proxy
		proxy: {},
	},
	define: {
		__APP_INFO__: JSON.stringify(__APP_INFO__),
	},
	build: {
		outDir: "build",
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
					antd: ["antd", "@ant-design/icons"],
					faker: ["@faker-js/faker"],
				},
			},
		},
	},
});
