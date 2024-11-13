import type { LanguageType } from "#src/locales";
import { usePreferencesStore } from "#src/store";

import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useLanguage() {
	const { i18n } = useTranslation();
	const { changeLanguage } = usePreferencesStore();

	const handleChangeLanguage = useCallback(
		async (locale: LanguageType) => {
			// store language
			changeLanguage(locale);
			// react-i18n language
			await i18n.changeLanguage(locale);
			// If you need to reload the page, please delete `key={lng}` in other files
		},
		[changeLanguage, i18n],
	);

	return useMemo(
		() => ({
			language: i18n.language as LanguageType,
			setLanguage: handleChangeLanguage,
		}),
		[handleChangeLanguage, i18n.language],
	);
}
