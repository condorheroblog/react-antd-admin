import type { ReactNode } from "react";
import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export interface IndexRouteMeta extends IndexRouteObject {
	redirect?: string;
	meta?: RouteMeta;
}
export interface NonIndexRouteMeta extends NonIndexRouteObject {
	redirect?: string;
	meta?: RouteMeta;
	children?: AppRouteRecordRaw[];
}

export type AppRouteRecordRaw = IndexRouteMeta | NonIndexRouteMeta;

export interface RouteMeta {
	title: string;
	hidden?: boolean;
	icon?: ReactNode;
	sort?: number;
	permissions?: string[];
	iframeLink?: string;
	externalLink?: string;
}
