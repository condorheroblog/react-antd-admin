import type { RouteObject } from "react-router";

import { LayoutRoot } from "#src/layout";
import { ROOT_ROUTE_ID } from "#src/router/constants";
import { addIdToRoutes } from "#src/router/utils";

import authRoutes from "./auth";
import exceptionRoutes from "./exception";
import fallbackRoute from "./fallback";

/** 核心路由，根路由的 children */
export const coreRouteRootChildren: any = [
	...addIdToRoutes([...authRoutes, ...exceptionRoutes]),
	...fallbackRoute,
];

export const coreRoutes: any = [
	{
		path: "/",
		id: ROOT_ROUTE_ID,
		Component: LayoutRoot,
		children: coreRouteRootChildren,
	},
] satisfies RouteObject[];
