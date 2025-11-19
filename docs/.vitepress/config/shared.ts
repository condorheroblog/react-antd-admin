import { defineConfig } from "vitepress";
import { search as zhSearch } from "./zh";

export const shared = defineConfig({
	title: "React Antd Admin",

	base: "/react-antd-admin/docs/",

	// rewrites: {
	// 	"zh/:rest*": ":rest*",
	// },

	lastUpdated: true,
	cleanUrls: true,
	metaChunk: true,

	markdown: {
		// math: true,
		codeTransformers: [
			// We use `[!!code` in demo to prevent transformation, here we revert it back.
			{
				postprocess(code) {
					return code.replace(/\[!!code/g, "[!code");
				},
			},
		],
	},

	sitemap: {
		hostname: "https://condorheroblog.github.io/react-antd-admin",
		transformItems(items) {
			return items.filter(item => !item.url.includes("migration"));
		},
	},

	/* prettier-ignore */
	head: [
		["link", { rel: "icon", type: "image/svg+xml", href: "./logo.svg" }],
		["link", { rel: "icon", type: "image/png", href: "./logo.png" }],
		["meta", { name: "theme-color", content: "#5f67ee" }],
		["meta", { property: "og:type", content: "website" }],
		["meta", { property: "og:locale", content: "en" }],
		["meta", { property: "og:title", content: "React Antd Admin | 企业级管理系统框架" }],
		["meta", { property: "og:site_name", content: "React Antd Admin" }],
		["meta", { property: "og:image", content: "https://condorheroblog.github.io/react-antd-admin/docs/shared-og.png" }],
		["meta", { property: "og:url", content: "https://condorheroblog.github.io/react-antd-admin/" }],
	],

	themeConfig: {
		outline: "deep",
		logo: { src: "/logo.svg", width: 24, height: 24 },

		socialLinks: [
			{ icon: "github", link: "https://github.com/condorheroblog/react-antd-admin" },
		],

		search: {
			provider: "local",
			options: {
				locales: {
					...zhSearch,
				},
			},
		},
	},
});
