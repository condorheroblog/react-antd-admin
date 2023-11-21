import { createBrowserRouter } from "react-router-dom";
import type { AppRouteRecordRaw } from "./types";

import { RouterGuards } from "./ guards";

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
	return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

export const router = createBrowserRouter(
	[
		{
			path: "/",
			id: "root-route",
			Component: RouterGuards,
			children: routeModuleList,
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
);

export default router;
