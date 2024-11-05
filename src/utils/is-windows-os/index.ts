/**
 * 检查当前运行环境是否为 Windows OS。
 *
 * 通过检查 navigator.userAgent 字符串来判断当前运行环境。
 */
export function isWindowsOs() {
	const windowsRegex = /windows|win32/i;
	return windowsRegex.test(navigator.userAgent);
}
