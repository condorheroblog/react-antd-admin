/**
 * 检查当前运行环境是否为 macOS。
 *
 * 通过检查 navigator.userAgent 字符串来判断当前运行环境。
 */
export function isMacOs() {
	const macRegex = /macintosh|mac os x/i;
	return macRegex.test(navigator.userAgent);
}
