/**
 * @zh 此函数没有任何意义，仅用于对 lokalise.i18n-ally 插件获取更好良好的语言提示支持。
 * @en This function has no practical meaning; it is only used to obtain better language prompt support for the lokalise.i18n-ally plugin.
 *
 * @link https://github.com/i18next/react-i18next/issues/1058
 * @zh 官方不推荐在纯 JS 或者 TS 文件场景下如何使用 react-i18next，且目前没有较好的解决方案。
 * @en The official recommendation does not cover how to use react-i18next in pure JS or TS file scenarios, and there is currently no good solution.
 *
 */
export function $t(path: string) {
	return path;
}
