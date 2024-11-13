/**
 * 判断当前主题是否为浅色主题
 *
 * @param theme 主题名称，可以是 "light"（浅色）、"dark"（深色）或 "auto"（自动）
 * @returns 如果当前主题为浅色主题，则返回 true；否则返回 false
 */
export function isLightTheme(theme: string) {
	let light = theme === "light";
	if (theme === "auto") {
		light = window.matchMedia("(prefers-color-scheme: light)").matches;
	}
	return light;
}
