import type { AppRouteRecordRaw, RouteFileModule } from "#src/router/types";

import { loginPath } from "#src/router/extra-info";
import { ascending, mergeRouteModules } from "#src/router/utils";
import { traverseTreeValues } from "#src/utils";
import { coreRoutes } from "./core";

// 外部路由文件
export const externalRouteFiles: RouteFileModule = import.meta.glob("./external/**/*.ts", { eager: true });
// 前端静态路由文件
export const staticRouteFiles: RouteFileModule = import.meta.glob("./static/**/*.ts", { eager: true });

/**
 * 后端动态路由文件
 */
export const dynamicRouteFiles: RouteFileModule = import.meta.glob("./modules/**/*.ts", { eager: true });

/**
 * 外部路由 1. 不进行权限校验， 2. 不会触发请求，例如用户信息接口
 * @example "privacy-policy", "terms-of-service" 等
 */
export const externalRoutes: AppRouteRecordRaw[] = mergeRouteModules(externalRouteFiles);

/** 动态路由 */
export const dynamicRoutes: AppRouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** 静态路由 */
export const staticRoutes: AppRouteRecordRaw[] = mergeRouteModules(staticRouteFiles);

/**
 * 基本路由列表，由核心路由、外部路由组成，会一直存在系统中
 */
const baseRoutes = ascending([
	...coreRoutes,
	...externalRoutes,
]);

/** 权限路由列表，包含动态路由和静态路由 */
const accessRoutes = [
	...dynamicRoutes,
	...staticRoutes,
];

/**
 * 路由白名单 1. 不进行权限校验， 2. 不会触发请求，例如用户信息接口
 * @example "privacy-policy", "terms-of-service" 等
 */
const whiteRouteNames = [
	loginPath,
	...traverseTreeValues(externalRoutes, route => route.path),
];

export {
	accessRoutes,
	baseRoutes,
	whiteRouteNames,
};
