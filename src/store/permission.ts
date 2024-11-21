import type { MenuItemType } from "#src/layout/layout-menu/types";
import type { AppRouteRecordRaw } from "#src/router/types";

import { fetchAsyncRoutes } from "#src/api/user";
import { router } from "#src/router";
import { ROOT_ROUTE_ID } from "#src/router/constants";
import { rootChildRoutes, routes } from "#src/router/routes";
import { addAsyncRoutes, ascending, flattenRoutes, getMenuItems } from "#src/router/utils";
import { create } from "zustand";

interface InitialStateType {
	// 静态路由生成的菜单
	constantMenus: MenuItemType[]
	// 静态路由（前端）和动态路由（后端）生成的菜单
	wholeMenus: MenuItemType[]
	// 有权限的 React Router 路由
	routeList: AppRouteRecordRaw[]
	// 扁平化后的路由，路由 id 作为索引 key
	flatRouteList: Record<string, AppRouteRecordRaw>
	// 表示 hasFetchedDynamicRoutes 是否被请求过
	hasFetchedDynamicRoutes: boolean
}
const initialState: InitialStateType = {
	constantMenus: getMenuItems(rootChildRoutes),
	wholeMenus: getMenuItems(rootChildRoutes),
	routeList: [],
	flatRouteList: {},
	hasFetchedDynamicRoutes: false,
};

type TagsState = typeof initialState;

interface TagsAction {
	handleAsyncRoutes: () => Promise<InitialStateType>
	reset: () => void
};

export const usePermissionStore = create<TagsState & TagsAction>(set => ({
	...initialState,

	handleAsyncRoutes: async () => {
		const { result } = await fetchAsyncRoutes();
		// 为动态路由添加前端组件
		const dynamicRoutes = addAsyncRoutes(result);
		const newRoutes = ascending([...rootChildRoutes, ...dynamicRoutes]);

		const constantMenus = getMenuItems((router.routes[0].children || []) as AppRouteRecordRaw[]);

		/* 添加动态路由到前端根路由 */
		router.patchRoutes(ROOT_ROUTE_ID, dynamicRoutes);

		const flatRouteList = flattenRoutes(newRoutes);

		const wholeMenus = getMenuItems(newRoutes);
		const newState = {
			constantMenus,
			wholeMenus,
			routeList: newRoutes,
			flatRouteList,
			hasFetchedDynamicRoutes: true,
		};
		set(() => newState);
		return newState;
	},

	reset: () => {
		/* 移除动态路由 */
		router._internalSetRoutes(routes);
		set(initialState);
	},
}));
