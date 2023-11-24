import { Trans } from "react-i18next";

/**
 * @link https://github.com/i18next/react-i18next/issues/1058
 * @description 在纯 JS 或者 TS 文件场景下如何使用 react-i18next？
 * 使用 i18n.t 内容可以正常显示，但是通过 i18n.changeLanguage 切换语言时
 * i18n.t 显示的内容不会自动更新，因为 i18n.t 返回的是字符串
 * 这里使用 t.tsx 文件作为临时方案以实现在纯 JS 或者 TS 文件中使用 t 函数
 *
 * How to use react-i18next in pure JS or TS file scenarios?
 * When using i18n.t, the content is displayed correctly. However, when switching the language using i18n.changeLanguage,
 * the content displayed by i18n.t does not automatically update because i18n.t returns a string.
 * Here, t.tsx file is used as a temporary solution to enable the usage of the t function in pure JS or TS files.
 */
export function t(path: string) {
	return <Trans>{path}</Trans>;
}
