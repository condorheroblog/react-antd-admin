import { createBrowserRouter } from "react-router-dom";

import type { AppRouteRecordRaw } from "./types";
import { RouterGuards } from "./guards";

import Error404 from "#src/pages/404";

const modules = import.meta.glob<
	Record<string, { default: AppRouteRecordRaw[] }>
>("./modules/**/*.ts", { eager: true });

export const routeModuleList = Object.keys(modules).reduce<AppRouteRecordRaw[]>(
	(list, key) => {
		const mod = modules[key].default ?? {};
		const modList = Array.isArray(mod) ? [...mod] : [mod];
		return [...list, ...modList];
	},
	[],
);

function sortRoute(a: AppRouteRecordRaw, b: AppRouteRecordRaw) {
	return (a.handle?.sort ?? 0) - (b.handle?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

/** 路由白名单 */
export const whiteList = ["/login"];

export const router = createBrowserRouter(
	[
		{
			path: "/",
			id: "root-route",
			Component: RouterGuards,
			children: routeModuleList,
		},
		{
			path: "*",
			id: "errorBoundary-route",
			Component: Error404,
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
);

export default router;
