import { DEFAULT_PREFERENCES, usePreferencesStore } from "#src/store";
import { isDarkTheme, isLightTheme } from "#src/utils";

import { useMemo } from "react";

/**
 * 包装下用户偏好设置的参数，不需要存储在 localStorage 中，但是为了方便使用的变量可以在这里出现。
 *
 * @returns 返回包含用户偏好设置的对象，包括主题、是否为默认设置、是否为深色主题、是否为浅色主题
 */
export function usePreferences() {
	const preferences = usePreferencesStore();
	const { theme } = preferences;

	// 是否为默认的用户偏好设置
	const isDefault = useMemo(() => {
		return Object.entries(DEFAULT_PREFERENCES).every(([key, value]) => {
			return preferences[key as keyof typeof preferences] === value;
		});
	}, [preferences]);

	return {
		...preferences,
		isDefault,
		isDark: isDarkTheme(theme),
		isLight: isLightTheme(theme),
	};
}
