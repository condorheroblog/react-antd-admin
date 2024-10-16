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
	title: ReactNode
	hideMenu?: boolean
	icon?: ReactNode
	order?: number
	permissions?: string[]
	iframeLink?: string
	externalLink?: string
	ignoreAccess?: boolean
	roles?: string[]
	backstage?: boolean
}

export type RouterSubscriber = Parameters<ReturnType<typeof RemixRouter>["subscribe"]>[0];
export type RouterState = ReturnType<typeof RemixRouter>["state"];
export type RouterNavigate = ReturnType<typeof RemixRouter>["navigate"];
