import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationZH from "./zh-CN/translation.json";

export type LanguageType = "zh-CN" | "en";

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

i18n.use(initReactI18next).init(i18nInitOptions);

export default i18n;
