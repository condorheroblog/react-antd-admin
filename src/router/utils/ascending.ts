import type { AppRouteRecordRaw } from "#src/router/types";

/** 按照路由中 order 升序来排序路由 */
export function ascending(arr: AppRouteRecordRaw[]) {
	return arr.map((routeItem, routeIndex) => ({
		...routeItem,
		handle: {
			...routeItem.handle,
			// 当 order 不存在时，根据顺序自动创建
			order: routeItem?.handle?.order || routeIndex + 2,
		},
	})).sort(
		(a, b) => {
			return a?.handle?.order - b?.handle?.order;
		},
	);
}
