import type { ReactNode } from "react";
import type { IndexRouteObject, NonIndexRouteObject, createBrowserRouter as RemixRouter } from "react-router-dom";

export interface IndexRouteMeta extends Omit<IndexRouteObject, "id"> {
	redirect?: string
	handle: RouteMeta
}
export interface NonIndexRouteMeta extends Omit<NonIndexRouteObject, "id"> {
	redirect?: string
	handle: RouteMeta
	children?: AppRouteRecordRaw[]
}

export type AppRouteRecordRaw = IndexRouteMeta | NonIndexRouteMeta;

export interface RouteMeta {
	/**
	 * 路由标题，通常用于页面标题或者侧边栏菜单显示
	 */
	title: ReactNode

	/**
	 * 设置页面是否开启缓存，开启后页面会缓存，不会重新加载，仅在标签页启用时有效。
	 * @default true
	 */
	keepAlive?: boolean

	/**
	 * 是否隐藏菜单，用于控制某些路由不在侧边栏菜单中显示
	 */
	hideInMenu?: boolean

	/**
	 * 菜单图标，用于侧边栏菜单项的图标显示
	 */
	icon?: ReactNode

	/**
	 * 菜单排序，用于控制侧边栏菜单的显示顺序
	 */
	order?: number

	/**
	 * 角色限制，建议根据实际需求调整类型，如使用 string[]
	 * 例如，可以是一个字符串数组，指定哪些角色可以访问
	 */
	roles?: string[]

	/**
	 * 权限字符串数组，用于控制访问权限
	 */
	auth?: string[]

	/**
	 * 权限字符串数组（备选），与auth类似，但用于区分不同的权限控制逻辑或场景
	 */
	permissions?: string[]

	/**
	 * iframe链接，如果路由需要在iframe中加载外部页面时使用
	 */
	iframeLink?: string

	/**
	 * 外部链接，点击后直接在新标签页中打开
	 */
	externalLink?: string

	/**
	 * 是否忽略权限，即无需登录即可访问
	 */
	ignoreAccess?: boolean

	/**
	 * @description 手动选择，当前激活菜单，例如动态路由情景下需要激活父菜单
	 * 例如，从 '/user/info' 导航到 '/user/info/1' 时，可能需要手动设置以高亮显示父菜单 '/user/info'
	 */
	currentActiveMenu?: string

	/**
	 * 当前路由为请求后端接口得到的
	 */
	backstage?: boolean
}

export type RouterSubscriber = Parameters<ReturnType<typeof RemixRouter>["subscribe"]>[0];
export type RouterState = ReturnType<typeof RemixRouter>["state"];
export type RouterNavigate = ReturnType<typeof RemixRouter>["navigate"];
