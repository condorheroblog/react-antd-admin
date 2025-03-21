import type { AppRouteRecordRaw, RouteFileModule } from "#src/router/types";

import { ascending, mergeRouteModules } from "#src/router/utils";
import { enabledDynamicRouting } from "./config";
import { coreRouteRootChildren, coreRoutes } from "./core";

// 前端静态路由文件
export const staticRouteFiles: RouteFileModule = import.meta.glob("./static/**/*.ts", { eager: true });

/**
 * 后端动态路由文件
 * 这个目录没有意义，只是为了方便管理和后端对接的路由
 * 如果后端接口报错或其他原因不可用，可以临时启用这个目录，防止项目无法访问
 */
export const dynamicRouteFiles: RouteFileModule = import.meta.glob("./modules/**/*.ts", { eager: true });

/** 动态路由 */
const dynamicRoutes: AppRouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** 静态路由 */
const staticRoutes: AppRouteRecordRaw[] = mergeRouteModules(staticRouteFiles);

/** 根路由下的子路由 */
const rootChildRoutes = ascending([
	...coreRouteRootChildren,
	...(!enabledDynamicRouting ? dynamicRoutes : []),
	...staticRoutes,
]);

coreRoutes[0].children = rootChildRoutes;
/**
 * 路由列表，包含所有的路由，用于初始化路由
 */
const routes: AppRouteRecordRaw[] = coreRoutes;

export {
	rootChildRoutes,
	routes,
};
