import type { GlobalToken } from "antd";
import { getCSSVariablesByTokens } from "./utils";

/**
 * Setup antd theme tokens to html
 * @see https://ant.design/docs/spec/colors
 */
export function setupAntdThemeTokensToHtml(antdTokens: GlobalToken) {
	const cssVariablesString = getCSSVariablesByTokens(antdTokens);

	const styleId = "antd-theme-tokens";
	const styleSheet = document.querySelector(`#${styleId}`) || document.createElement("style");
	styleSheet.id = styleId;
	styleSheet.textContent = `:root { ${cssVariablesString} }`;
	document.head.appendChild(styleSheet);
}
