import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { createRouterGuards } from "./ guards";

const modules = import.meta.glob<Record<string, { default: RouteObject[] }>>("./modules/**/*.ts", { eager: true });

const routeModuleList = Object.keys(modules).reduce<RouteObject[]>((list, key) => {
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
