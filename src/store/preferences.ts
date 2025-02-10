import type {
	MIXED_NAVIGATION,
	TOP_NAVIGATION,
	TWO_COLUMN_NAVIGATION,
} from "#src/layout/widgets/preferences/blocks/layout/constants";
import type { LanguageType } from "#src/locales";
import type { MenuProps } from "antd";

import { SIDE_NAVIGATION } from "#src/layout/widgets/preferences/blocks/layout/constants";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @zh 标签栏风格
 * @en Tabbar style
 */
export type TabsStyleType = "brisk" | "card" | "chrome" | "plain";

/**
 * @zh 主题类型
 * @en Theme type
 */
export type ThemeType = "dark" | "light" | "auto";

/**
 * @zh 动画类型
 * @en Animation type
 */
interface AnimationState {
	/**
	 * @zh 是否启用过渡动画
	 * @en Whether to enable transition animation
	 * @default true
	 */
	transitionProgress: boolean
	/**
	 * @zh 是否启用加载动画
	 * @en Whether to enable loading animation
	 * @default true
	 */
	transitionLoading: boolean
	/**
	 * @zh 是否启用动画
	 * @en Whether to enable animation
	 * @default true
	 */
	transitionEnable: boolean
	/**
	 * @zh 过渡动画名称
	 * @en Transition animation name
	 * @default "fade-slide"
	 */
	transitionName: string
}

export type NavigationType = typeof SIDE_NAVIGATION | typeof TOP_NAVIGATION | typeof TWO_COLUMN_NAVIGATION | typeof MIXED_NAVIGATION;
export type BuiltinThemeType = "red" | "volcano" | "orange" | "gold" | "yellow" | "lime" | "green" | "cyan" | "blue" | "geekblue" | "purple" | "magenta" | "gray" | "custom";

interface LayoutState {
	navigationStyle: NavigationType
}

export interface GeneralState {
	/**
		* @zh 当前语言
		* @en Current language
		* @default "zh-CN"
		*/
	language: LanguageType
	/**
	 * @zh 是否开启更新检查
	 * @en Whether to enable update check
	 * @default true
	 */
	enableCheckUpdates: boolean
	/**
	 * @zh 轮训时间，单位：分钟，默认 1 分钟
	 * @en Polling time, unit: minute, default 1 minute
	 * @default 1
	 */
	checkUpdatesInterval: number
}

export interface SidebarState {
	/**
	 * 侧边栏是否可见
	 * @default true
	 */
	sidebarEnable?: boolean
	/**
	 * 侧边菜单宽度
	 * @default 210
	 */
	sidebarWidth: number
	/**
	 * 侧边菜单折叠宽度
	 * @default 56
	 */
	sideCollapsedWidth: number
	/**
	 * 侧边菜单折叠状态
	 * @default false
	 */
	sidebarCollapsed: boolean
	/**
	 * 侧边菜单是否折叠时，是否显示 title
	 * @default true
	 */
	sidebarCollapseShowTitle: boolean
	/**
	 * 侧边菜单折叠额外宽度
	 * @default 48
	 */
	sidebarExtraCollapsedWidth: number
	/**
	 * 两栏布局时，左侧菜单宽度
	 * @default 80
	 */
	firstColumnWidthInTwoColumnNavigation: number
	/**
	 * 侧边栏
	 * @default dark
	 */
	sidebarTheme: MenuProps["theme"]
}

interface PreferencesState extends AnimationState, LayoutState, GeneralState, SidebarState {
	/* ================== Theme ================== */
	/**
	 * @zh 当前主题
	 * @en Current theme
	 * @default "auto"
	 */
	theme: ThemeType
	/**
	 * @zh 是否开启色弱模式
	 * @en Whether to enable color-blind mode
	 * @default false
	 */
	colorBlindMode: boolean
	/**
	 * @zh 是否开启灰色模式
	 * @en Whether to enable gray mode
	 * @default false
	 */
	colorGrayMode: boolean
	/**
	 * @zh 主题圆角值
	 * @en Theme radius value
	 * @default 6
	 */
	themeRadius: number
	/**
	 * @zh 主题色
	 * @en Theme color
	 * @default "#1677ff" - blue
	 */
	themeColorPrimary: string
	/**
	 * @zh 内置主题
	 * @en Builtin theme
	 * @default "blue"
	 */
	builtinTheme: BuiltinThemeType
	/* ================== Theme ================== */

	/* ================== Tabbar ================== */
	/**
	 * @zh 标签栏风格
	 * @en Tabbar style
	 * @default "chrome"
	 */
	tabbarStyleType: TabsStyleType
	/**
	 * @zh 是否启用标签栏
	 * @en Whether to enable tabbar
	 * @default true
	 */
	tabbarEnable: boolean
	/**
	 * @zh 是否显示标签栏图标
	 * @en Whether to show tabbar icon
	 * @default true
	 * @todo 待实现
	 */
	tabbarShowIcon: boolean
	/**
	 * @zh 是否持久化标签栏
	 * @en Whether to persist tabbar
	 * @default true
	 */
	tabbarPersist: boolean
	/**
	 * @zh 是否可拖拽标签栏
	 * @en Whether to drag tabbar
	 * @default true
	 * @todo 待实现
	 */
	tabbarDraggable: boolean
	/**
	 * @zh 是否显示更多
	 * @en Whether to show more
	 * @default true
	 */
	tabbarShowMore: boolean
	/**
	 * @zh 是否显示最大化
	 * @en Whether to show maximize
	 * @default true
	 */
	tabbarShowMaximize: boolean
	/* ================== Tabbar ================== */
}

/**
 * 默认偏好设置
 */
export const DEFAULT_PREFERENCES = {
	/* ================== General ================== */
	language: "zh-CN",
	enableCheckUpdates: true,
	checkUpdatesInterval: 1,
	/* ================== General ================== */

	/* ================== Theme ================== */
	theme: "auto",
	colorBlindMode: false,
	colorGrayMode: false,
	themeRadius: 6,
	builtinTheme: "blue",
	themeColorPrimary: "#1677ff",
	/* ================== Theme ================== */

	/* ================== Animation ================== */
	transitionProgress: true,
	transitionLoading: true,
	transitionEnable: true,
	transitionName: "fade-slide",
	/* ================== Animation ================== */

	/* ================== Layout ================== */
	navigationStyle: SIDE_NAVIGATION,

	/* ================== Layout ================== */

	/* ================== Tabbar ================== */
	tabbarEnable: true,
	tabbarShowIcon: true,
	tabbarPersist: true,
	tabbarDraggable: true,
	tabbarStyleType: "chrome",
	tabbarShowMore: true,
	tabbarShowMaximize: true,
	/* ================== Tabbar ================== */

	/* ================== Sidebar ================== */
	sidebarEnable: true,
	sidebarWidth: 210,
	sideCollapsedWidth: 56,
	sidebarCollapsed: false,
	sidebarCollapseShowTitle: true,
	sidebarExtraCollapsedWidth: 48,
	firstColumnWidthInTwoColumnNavigation: 80,
	sidebarTheme: "light",
	/* ================== Sidebar ================== */
} satisfies PreferencesState;

/**
 * 偏好设置操作接口
 */
interface PreferencesAction {
	reset: () => void
	changeSiteTheme: (theme: ThemeType) => void
	changeLanguage: (language: LanguageType) => void
	setPreferences: {
		// 单个 key-value 更新
		<T>(key: string, value: T): void
		// 对象形式批量更新
		<T extends Partial<PreferencesState>>(preferences: T): void
	}
};

/**
 * 偏好设置状态管理
 */
export const usePreferencesStore = create<PreferencesState & PreferencesAction>()(
	persist(
		set => ({
			...DEFAULT_PREFERENCES,

			/**
			 * 更新偏好设置
			 */
			setPreferences: (...args: any[]) => {
				if (args.length === 1) {
					const preferences = args[0];
					set(() => {
						return { ...preferences };
					});
				}
				else if (args.length === 2) {
					const [key, value] = args;
					set(() => {
						return { [key]: value };
					});
				}
			},

			/**
			 * 更新主题
			 */
			changeSiteTheme: (theme) => {
				set(() => {
					return { theme };
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
					return { ...DEFAULT_PREFERENCES };
				});
			},

		}),
		{ name: "preferences" },
	),

);
