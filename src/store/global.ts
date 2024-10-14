import { isMobile } from "#src/utils";

import { create } from "zustand";

/**
 * @zh 主题类型
 * @en Theme type
 */
export type ThemeType = "dark" | "light" | "";

/**
 * @zh 从 localStorage 中获取默认主题，如果没有则默认为空字符串
 * @en Get the default theme from localStorage, or an empty string if not found
 */
const defaultTheme = localStorage.getItem("theme") ?? "";

/**
 * @zh 应用的初始状态
 * @en Initial state of the application
 */
const initialState = {
	/**
	 * @zh 全局加载动画是否显示
	 * @en Whether the global spinning animation is shown
	 */
	globalSpin: false,
	/**
	 * @zh 当前主题
	 * @en Current theme
	 */
	theme: defaultTheme as ThemeType,
	/**
	 * @zh 是否为暗色主题
	 * @en Whether it is a dark theme
	 */
	isDark: defaultTheme === "dark",
	/**
	 * @zh 是否为亮色主题
	 * @en Whether it is a light theme
	 */
	isLight: defaultTheme === "light",
	/**
	 * @zh 是否为移动设备
	 * @en Whether it is a mobile device
	 */
	isMobile: isMobile(),
};

type GlobalState = typeof initialState;

interface GlobalAction {
	openGlobalSpin: () => void
	closeGlobalSpin: () => void
	changeSiteTheme: (payload: {
		theme: ThemeType
		isWriteLocalStorage?: boolean
	}) => void
	changeWindowSize: (payload: boolean) => void
};

export const useGlobalStore = create<GlobalState & GlobalAction>(set => ({
	...initialState,

	openGlobalSpin: () => {
		return set({
			globalSpin: true,
		});
	},

	closeGlobalSpin: () => {
		return set({
			globalSpin: false,
		});
	},

	changeSiteTheme: (
		payload,
	) => {
		const theme = payload.theme ?? "";
		if (payload.isWriteLocalStorage) {
			window.localStorage.setItem("theme", theme);
		}
		return set({
			theme,
			isDark: theme === "dark",
			isLight: theme === "light",
		});
	},

	changeWindowSize: (payload) => {
		return set({
			isMobile: payload,
		});
	},

}));
