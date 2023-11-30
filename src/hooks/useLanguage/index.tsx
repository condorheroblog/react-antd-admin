import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { LanguageType } from "#src/locales";
import { useAppDispatch, userSlice } from "#src/store";

export const useLanguage = () => {
	const { i18n } = useTranslation();
	const dispatch = useAppDispatch();

	const handleChangeLanguage = useCallback(
		async (locale: LanguageType) => {
			// local language
			window.localStorage.setItem("lng", locale);
			// redux language
			dispatch(userSlice.actions.changeLanguage(locale));
			// react-i18n language
			await i18n.changeLanguage(locale);
			// If you need to reload the page, please delete `key={lng}` in other files
		},
		[i18n],
	);

	return useMemo(
		() => ({
			language: i18n.language as LanguageType,
			setLanguage: handleChangeLanguage,
		}),
		[handleChangeLanguage, i18n.language],
	);
};
