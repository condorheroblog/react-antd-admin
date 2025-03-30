import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { getColorPalettes } from "./src/styles/theme/antd/css-variables";

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
			/**
			 * 使用 Ant Design 的颜色系统来替代 Tailwind CSS 默认的颜色配置
			 * 说明：对于亮色和暗色模式，除基础色板外的颜色会自动适配主题，无需额外配置（例如：bg-colorBorderSecondary）
			 * 但基础色板（如 bg-cyan-100）仍需手动设置暗色模式样式
			 * @see https://ant.design/docs/spec/colors
			 */
			...getColorPalettes,
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
				bounceInDownOutUp: {
					"0%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
					"100%": { transform: "translateY(0)" },
				},
			},
			animation: {
				wiggle: "wiggle 1s both",
				bounceInDownOutUp: "bounceInDownOutUp 4s ease-in-out 0ms infinite",
			},
		},
	},
	plugins: [
		plugin(({ addVariant }) => {
			const languages = ["en-US", "zh-CN"];
			/**
			 * 添加 lang 伪类选择器
			 *
			 * @example
			 * ```
			 * en-US:text-white
			 * ```
			 */

			for (const lang of languages) {
				addVariant(`${lang}`, `&:lang(${lang})`);
			}
		}),
	],
} satisfies Config;
