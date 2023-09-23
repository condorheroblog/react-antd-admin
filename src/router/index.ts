import { createBrowserRouter } from "react-router-dom";
import type { AppRouteRecordRaw } from "./types";

import { createRouterGuards } from "./ guards";

const modules = import.meta.glob<Record<string, { default: AppRouteRecordRaw[] }>>("./modules/**/*.ts", { eager: true });

export const routeModuleList = Object.keys(modules).reduce<AppRouteRecordRaw[]>((list, key) => {
	const mod = modules[key].default ?? {};
	const modList = Array.isArray(mod) ? [...mod] : [mod];
	return [...list, ...modList];
}, []);

export const router = createBrowserRouter([
	{
		path: "/",
		Component: createRouterGuards,
		children: routeModuleList,
	},
]);

export default router;
