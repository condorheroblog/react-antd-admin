import { ROOT_ROUTE_ID } from "#src/router/constants";
import { RouterGuards } from "#src/router/guards";
import { addIdToRoutes } from "#src/router/utils";

import { lazy } from "react";

import authRoutes from "./auth";
import exceptionRoutes from "./exception";

const NotFound = lazy(() => import("#src/pages/exception/404"));

/** 核心路由，根路由的 children */
export const coreRouteRootChildren = addIdToRoutes([...authRoutes, ...exceptionRoutes]);
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
