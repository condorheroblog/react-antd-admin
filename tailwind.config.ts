import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	corePlugins: {
		preflight: false,
	},
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {},
} satisfies Config;
