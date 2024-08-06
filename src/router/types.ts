import type { ReactNode } from "react";
import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export interface IndexRouteMeta extends Omit<IndexRouteObject, "id"> {
	redirect?: string
	handle?: RouteMeta
}
export interface NonIndexRouteMeta extends Omit<NonIndexRouteObject, "id"> {
	redirect?: string
	handle?: RouteMeta
	children?: AppRouteRecordRaw[]
}

export type AppRouteRecordRaw = IndexRouteMeta | NonIndexRouteMeta;

export interface RouteMeta {
	title: ReactNode
	hideMenu?: boolean
	icon?: ReactNode
	sort?: number
	permissions?: string[]
	iframeLink?: string
	externalLink?: string
	publicAccess?: boolean
}
