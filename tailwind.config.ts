import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	corePlugins: {
		preflight: false,
	},
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				wiggle: {
					"0%, 100%": { "transform-origin": "top" },
					"15%": { transform: "rotateZ(10deg)" },
					"30%": { transform: "rotateZ(-10deg)" },
					"45%": { transform: "rotateZ(5deg)" },
					"60%": { transform: "rotateZ(-5deg)" },
					"75%": { transform: "rotateZ(2deg)" },
				},
			},
			animation: {
				wiggle: "wiggle 1s both",
			},
		},
	},
} satisfies Config;
