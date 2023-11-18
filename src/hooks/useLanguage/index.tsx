import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LanguageType } from "#src/locales";

export const useLanguage = () => {
	const { i18n } = useTranslation();

	const handleChangeLanguage = useCallback(
		async (locale: LanguageType) => {
			localStorage.setItem("lng", locale);
			await i18n.changeLanguage(locale);
		},
		[i18n],
	);

	return useMemo(
		() => ({ language: i18n.language as LanguageType, setLanguage: handleChangeLanguage }),
		[handleChangeLanguage, i18n.language],
	);
};
