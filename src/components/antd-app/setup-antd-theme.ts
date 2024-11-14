import type { GlobalToken } from "antd";
import { colorPalettes, neutralColors, prefix, productLevelColorSystem } from "./constants";

/**
 * 16 进制颜色值转 RGB 颜色值，因为 16 进制的颜色值在 tailwind 中不支持透明度，比如无法使用 bg-blue-500/20
 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
 */
function hexToRGB(hex: string) {
	// 移除可能存在的 # 号
	hex = hex.replace("#", "");

	// 获取 R、G、B 的值
	const r = Number.parseInt(hex.substring(0, 2), 16);
	const g = Number.parseInt(hex.substring(2, 4), 16);
	const b = Number.parseInt(hex.substring(4, 6), 16);

	return `${r} ${g} ${b}`;
}

// 判断是否是 RGB 颜色值
function isRGBColor(color: string) {
	return color.trim().startsWith("rgb");
}

export function getCSSVariablesByTokens(tokens: GlobalToken) {
	return Object.entries(tokens)
		.reduce((acc, [key, value]): string => {
			// 功能色系，不包含中性色系
			if (productLevelColorSystem.includes(key)) {
				const rgb = hexToRGB(value);
				return `${acc}--${prefix}-${key}:${rgb};`;
			}

			// 中性色系
			if (neutralColors.includes(key)) {
				// 如果颜色值是 rgb 格式，则直接使用
				const rgb = isRGBColor(value) ? value : `rgb(${hexToRGB(value)})`;
				return `${acc}--${prefix}-${key}:${rgb};`;
			}
			// 色板
			return colorPalettes.includes(key) ? `${acc}--${prefix}-${key}:${hexToRGB(value)};` : acc;
		}, "");
}

/** Setup antd theme tokens to html */
export function setupAntdThemeTokensToHtml(antdTokens: GlobalToken) {
	const cssVariablesString = getCSSVariablesByTokens(antdTokens);

	const styleId = "antd-theme-tokens";
	const styleSheet = document.querySelector(`#${styleId}`) || document.createElement("style");
	styleSheet.id = styleId;
	styleSheet.textContent = `:root { ${cssVariablesString} }`;
	document.head.appendChild(styleSheet);
}
