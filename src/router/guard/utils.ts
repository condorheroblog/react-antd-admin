import type { AppRouteRecordRaw } from "#src/router/types";

export function removeDuplicateRoutes(routes: AppRouteRecordRaw[]) {
	const pathSet = new Set<string>();
	return routes.filter((route) => {
		if (pathSet.has(route.path!)) {
			console.warn(`[auth-guard]: Duplicate route path: ${route.path}`);
			return false;
		}
		pathSet.add(route.path!);
		return true;
	});
}
