import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationZH from "./zh-CN/translation.json";

export type LanguageType = "zh-CN" | "en";

i18n.use(initReactI18next).init({
	lng: "zh-CN",
	resources: {
		"zh-CN": {
			translation: translationZH,
		},
		en: {
			translation: translationEN,
		},
	},
});

export default i18n;
