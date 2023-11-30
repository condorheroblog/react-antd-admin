import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";

import translationEN from "./en/translation.json";
import translationZH from "./zh-CN/translation.json";

export * from "./t";

export type LanguageType = "zh-CN" | "en";

export const ANT_DESIGN_LOCALE = {
	"zh-CN": zhCN,
	en: enUS,
};

export const i18nResources = {
	"zh-CN": {
		translation: translationZH,
	},
	en: {
		translation: translationEN,
	},
};

export const i18nInitOptions = {
	lng: "zh-CN",
	resources: i18nResources,
};

export default i18nInitOptions;
