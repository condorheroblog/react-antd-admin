import type { AppRouteRecordRaw } from "./types";

/**
 * 为路由数组中的每个路由对象添加一个唯一的 ID，该 ID 默认为路由的路径。
 * 如果路由对象包含子路由，则递归地为每个子路由添加 ID。
 *
 * @param routes 原始路由数组
 * @returns 带有 ID 的路由数组
 */
/**
 * Adds a unique ID to each route object in the routes array, defaulting the ID to the route's path.
 * If a route object contains child routes, recursively adds IDs to each child route.
 *
 * @param routes The original array of routes
 * @returns The array of routes with IDs
 */
export function addIdToRoutes(routes: AppRouteRecordRaw[]) {
	return routes.map((route) => {
		const newRoute = { ...route, id: route.path };

		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addIdToRoutes(newRoute.children);
		}

		return newRoute;
	});
}
