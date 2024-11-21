import { ROOT_ROUTE_ID } from "#src/router/constants";
import { RouterGuards } from "#src/router/guards";

import { lazy } from "react";

import authRoutes from "./auth";
import errorRoutes from "./error";

const NotFound = lazy(() => import("#src/pages/error/404"));

/** 核心路由，根路由的 children */
export const coreRouteRootChildren = [...authRoutes, ...errorRoutes];
export const coreRoutes: any = [
	{
		path: "/",
		id: ROOT_ROUTE_ID,
		Component: RouterGuards,
		children: coreRouteRootChildren,
	},
	{
		path: "*",
		id: "404",
		Component: NotFound,
	},
];
