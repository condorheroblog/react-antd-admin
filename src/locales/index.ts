import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getEnUsLang, getZhCnLang } from "./helper";

export * from "./t";

export type LanguageType = "zh-CN" | "en-US";

export const ANT_DESIGN_LOCALE = {
	"zh-CN": zhCN,
	"en-US": enUS,
};

export const i18nResources = {
	"zh-CN": {
		translation: getZhCnLang(),
	},
	"en-US": {
		translation: getEnUsLang(),
	},
};

export const i18nInitOptions = {
	lng: "zh-CN",
	resources: i18nResources,
};

export function setupI18n() {
	i18n.use(initReactI18next).init(i18nInitOptions);
	/**
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
	 */
	i18n.on("languageChanged", (lng) => {
		document.documentElement.lang = lng;
	});
}
