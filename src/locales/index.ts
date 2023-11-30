import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";

import translationZH from "./zh-CN";
import translationEN from "./en-US";

export * from "./t";

export type LanguageType = "zh-CN" | "en-US";

export const ANT_DESIGN_LOCALE = {
	"zh-CN": zhCN,
	"en-US": enUS,
};

export const i18nResources = {
	"zh-CN": {
		translation: translationZH,
	},
	"en-US": {
		translation: translationEN,
	},
};

export const i18nInitOptions = {
	lng: "zh-CN",
	resources: i18nResources,
};

export default i18nInitOptions;
