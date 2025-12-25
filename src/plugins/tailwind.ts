import { getColorPalettes } from "#src/styles/theme/antd/css-variables";

import plugin from "tailwindcss/plugin";

/**
 * How to use custom plugin in tailwindcss
 * @see https://github.com/tailwindlabs/tailwindcss/discussions/13292#discussioncomment-14256365
 */
export default plugin.withOptions(() => {
	return () => { };
}, () => {
	return {
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
				 *
				 */
				...getColorPalettes,
			},
		},
	};
});
