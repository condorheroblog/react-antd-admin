import type {
	MIXED_NAVIGATION,
	SIDE_NAVIGATION,
	TOP_NAVIGATION,
	TWO_COLUMN_NAVIGATION,
} from "#src/layout/widgets/preferences/blocks/layout/constants";

import type { LanguageType } from "#src/locales";
import type { MenuProps } from "antd";

/**
 * @zh 登录页面布局
 * @en Login page layout
 */
export type PageLayoutType = "layout-left" | "layout-center" | "layout-right";
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

export type NavigationType =
	| typeof SIDE_NAVIGATION
	| typeof TOP_NAVIGATION
	| typeof TWO_COLUMN_NAVIGATION
	| typeof MIXED_NAVIGATION;
export type BuiltinThemeType =
	| "red"
	| "volcano"
	| "orange"
	| "gold"
	| "yellow"
	| "lime"
	| "green"
	| "cyan"
	| "blue"
	| "geekblue"
	| "purple"
	| "magenta"
	| "gray"
	| "custom";

interface LayoutState {
	navigationStyle: NavigationType
}

export interface GeneralState {
	/**
	 * @zh 是否开启水印
	 * @en Whether to enable watermark
	 * @default false
	 */
	watermark: boolean
	/**
	 * @zh 水印内容
	 * @en Watermark content
	 * @default ""
	 */
	watermarkContent: string
	/**
	 * @zh 返回页面顶部的操作按钮
	 * @en BackTop makes it easy to go back to the top of the page.
	 * @default true
	 */
	enableBackTopButton: boolean
	/**
	 * @zh 登录页面的布局配置
	 * @en Login page layout configuration
	 * @default "layout-right"
	 */
	pageLayout: PageLayoutType
	/**
	 * @zh 开启前端路由权限
	 * @en Enable frontend route permissions
	 * @default false
	 */
	enableFrontendAceess: boolean
	/**
	 * @zh 开启后端路由权限
	 * @en Enable backend route permissions
	 * @default true
	 */
	enableBackendAccess: boolean

	/**
	 * @zh 当前语言
	 * @en Current language
	 * @default "zh-CN"
	 */
	language: LanguageType
	/**
	 * @zh 是否开启动态标题
	 * @en Whether to enable dynamic title
	 * @default true
	 */
	enableDynamicTitle: boolean
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

export interface FooterState {
	enableFooter: boolean
	fixedFooter: boolean
	companyName: string
	companyWebsite: string
	copyrightDate: string
	ICPNumber: string
	ICPLink: string
}

export interface PreferencesState
	extends AnimationState,
	LayoutState,
	GeneralState,
	SidebarState,
	FooterState {
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
