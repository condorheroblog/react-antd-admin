import type { AppRouteRecordRaw } from "#src/router/types";

/**
 * 为路由对象添加一个唯一的 ID，替代路由自动生成的 id，该 ID 默认为路由的路径（path）
 * {
 *   path: '/dashboard',
 * }
 *
 * 转化后
 *
 * {
 *   path: '/dashboard',
 *   id: '/dashboard',
 * }
 */
export function addRouteIdByPath(routes: AppRouteRecordRaw[], parentId = "") {
	return routes.map((route) => {
		// 如何是 index 路由，则 id 为父级路径 + "/"
		const newRoute = { ...route, id: route.index ? `${parentId}/` : route.path };

		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addRouteIdByPath(newRoute.children, route.path);
		}

		return newRoute;
	});
}
