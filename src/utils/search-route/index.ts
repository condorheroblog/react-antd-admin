import type { AppRouteRecordRaw } from "#src/router/types";

export function searchRoute(routes: AppRouteRecordRaw[], path: string): AppRouteRecordRaw | null {
	for (const routeItem of routes) {
		if (routeItem.path === path) {
			return routeItem;
		}
		if (routeItem.children) {
			const findItem = searchRoute(routeItem.children, path);
			if (findItem) {
				return findItem;
			}
		}
	}
	return null;
}
