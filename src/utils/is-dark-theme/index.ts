/**
 * 判断当前主题是否为深色主题
 *
 * @param theme 主题名称，可选值为 'dark'、'light' 或 'auto'
 * @returns 如果当前主题为深色主题，则返回 true；否则返回 false
 */
export function isDarkTheme(theme: string) {
	let dark = theme === "dark";
	if (theme === "auto") {
		dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
	return dark;
}
