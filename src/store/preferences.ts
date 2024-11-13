import type { LanguageType } from "#src/locales";

import { isDarkTheme, isLightTheme } from "#src/utils";
import { create } from "zustand";

import { persist } from "zustand/middleware";

/**
 * 标签栏风格
 * brisk 轻快
 * card 卡片
 * chrome 谷歌
 * plain 朴素
 */
export type TabsStyleType = "brisk" | "card" | "chrome" | "plain";

/**
 * @zh 主题类型
 * @en Theme type
 */
export type ThemeType = "dark" | "light" | "auto";

interface PreferencesState {
	language: LanguageType
	/**
	 * @zh 当前主题
	 * @en Current theme
	 */
	theme: ThemeType
	/**
	 * @zh 是否为暗色主题
	 * @en Whether it is a dark theme
	 */
	isDark: boolean
	/**
	 * @zh 是否为亮色主题
	 * @en Whether it is a light theme
	 */
	isLight: boolean

	tabbarStyleType: TabsStyleType
	tabbarEnable: boolean
	tabbarShowIcon: boolean
	tabbarPersist: boolean
	tabbarDraggable: boolean
	tabbarShowMore: boolean
	tabbarShowMaximize: boolean
}

/**
 * @zh 从 localStorage 中获取默认主题，如果没有则默认为空字符串
 * @en Get the default theme from localStorage, or an empty string if not found
 */
export const preferencesFromLocalStorage = localStorage.getItem("preferences") ?? JSON.stringify({ state: { theme: "auto" } });
const defaultTheme = JSON.parse(preferencesFromLocalStorage)?.state?.theme ?? "auto";

/**
 * 初始状态
 */
const initialState = {
	language: "zh-CN",
	theme: "auto",
	isDark: isDarkTheme(defaultTheme),
	isLight: isLightTheme(defaultTheme),

	// tabbar 相关配置
	tabbarEnable: true,
	tabbarShowIcon: true,
	tabbarPersist: true,
	tabbarDraggable: true,
	tabbarStyleType: "chrome",
	tabbarShowMore: true,
	tabbarShowMaximize: true,
} satisfies PreferencesState;

/**
 * 偏好设置操作接口
 */
interface PreferencesAction {
	reset: () => void
	changeSiteTheme: (theme: ThemeType) => void
	changeLanguage: (language: LanguageType) => void
	setPreferences: <T>(key: string, value: T) => void
};

/**
 * 偏好设置状态管理
 */
export const usePreferencesStore = create<PreferencesState & PreferencesAction>()(
	persist(
		set => ({
			...initialState,

			/**
			 * 更新偏好设置
			 */
			setPreferences: (key, value) => {
				set(() => {
					return { [key]: value };
				});
			},

			/**
			 * 更新主题
			 */
			changeSiteTheme: (theme) => {
				set(() => {
					return { theme, isDark: isDarkTheme(theme), isLight: isLightTheme(theme) };
				});
			},

			/**
			 * 更新语言
			 */
			changeLanguage: (language) => {
				set(() => {
					return { language };
				});
			},

			/**
			 * 重置状态
			 */
			reset: () => {
				set(() => {
					return { ...initialState };
				});
			},

		}),
		{ name: "preferences" },
	),

);
