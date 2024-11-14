import type { Config } from "tailwindcss";

import { colorPaletteVars } from "./src/styles/css-variables";

export default {
	darkMode: "class",
	corePlugins: {
		preflight: false,
	},
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		/**
		 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
		 */
		colors: {
			transparent: "transparent",
			inherit: "inherit",
			current: "currentColor",
			/**
			 * 使用 antd 的颜色覆盖 tailwind 的颜色
			 * 注意：在亮色模式和黑模式下新的颜色是自适应的，不需要手动配置（EX：dark:bg-cyan-100）
			 */
			...colorPaletteVars,
		},
		/**
		 * Use ant design breakpoints
		 * @see https://tailwindcss.com/docs/breakpoints
		 * @see https://ant.design/components/layout-cn#breakpoint-width
		 */
		screens: {
			"xs": "480px",
			"sm": "576px",
			"md": "768px",
			"lg": "992px",
			"xl": "1200px",
			"2xl": "1600px",
		},
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
