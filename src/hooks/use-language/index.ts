import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { LanguageType } from "#src/locales";
import { useUserStore } from "#src/store";

export function useLanguage() {
	const { i18n } = useTranslation();
	const { changeLanguage } = useUserStore();

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
