import type { AppRouteRecordRaw } from "#src/router/types";
import { Iframe } from "#src/components/iframe";
import { ContainerLayout } from "#src/layout";
import { lazy } from "react";
import { Outlet } from "react-router";
import { addRouteIdByPath } from "./add-route-id-by-path";

const ExceptionUnknownComponent = lazy(() => import("#src/pages/exception/unknown-component"));

/**
 * @zh 异步获取页面组件
 * @en Async load page components
 */
const pageModules = import.meta.glob([
	"/src/pages/**/*.tsx",
	// Exclude exception pages from lazy loading
	"!/src/pages/exception/**/*.tsx",
]);

/**
 * @zh 根据后端路由配置生成前端路由
 * @en Generate frontend routes based on backend route configurations
 */
export async function generateRoutesFromBackend(backendRoutes: Array<AppRouteRecordRaw>) {
	const pageModulePaths = Object.keys(pageModules);
	if (!backendRoutes?.length)
		return [];

	/**
	 * @zh 动态加载并设置路由组件
	 * @en Dynamically load and set route components
	 * @param route 路由配置对象
	 * @param componentPath 组件文件路径
	 */
	const loadRouteComponent = async (route: AppRouteRecordRaw, componentPath: string) => {
		const modulePath = `/src/pages${componentPath}/index.tsx`;
		const moduleIndex = pageModulePaths.findIndex(path => path === modulePath);

		if (moduleIndex !== -1) {
			const lazyComponent = pageModules[pageModulePaths[moduleIndex]];
			route.Component = lazy(lazyComponent as any);
		}
		else {
			console.warn(`[Frontend component not found]: ${componentPath}`);
			route.Component = ExceptionUnknownComponent;
		}
	};

	/**
	 * 转换路由配置
	 * @param route 原始路由配置
	 * @param parentPath 父级路径（用于嵌套路由）
	 * @returns 转换后的路由配置
	 */
	const transformRoute = async (route: AppRouteRecordRaw, parentPath?: string): Promise<AppRouteRecordRaw> => {
		const transformedRoute: AppRouteRecordRaw = {
			...route,
			handle: {
				...route.handle,
				backstage: true,
			},
		};

		// 处理 index 路由（继承父级路径）
		if (transformedRoute.index === true && parentPath) {
			await loadRouteComponent(transformedRoute, parentPath);
		}
		// 处理 iframe 路由
		else if (transformedRoute.handle?.iframeLink) {
			transformedRoute.Component = Iframe;
		}
		// 处理外部链接路由
		else if (transformedRoute.handle?.externalLink) {
			// 外部链接不需要组件
		}
		// 处理有子路由的情况
		else if (transformedRoute.children?.length) {
			transformedRoute.Component = parentPath ? Outlet : ContainerLayout;
		}
		// 处理普通路由
		else {
			await loadRouteComponent(transformedRoute, transformedRoute.path!);
		}

		// 递归处理子路由
		if (transformedRoute.children?.length) {
			transformedRoute.children = await Promise.all(
				transformedRoute.children.map(child =>
					transformRoute(child, transformedRoute.path),
				),
			);
		}

		return transformedRoute;
	};

	/**
	 * 标准化路由配置，确保每个路由都有子路由
	 */
	const normalizeRouteStructure = (route: AppRouteRecordRaw): AppRouteRecordRaw => {
		if (!route.children?.length) {
			return {
				...route,
				children: [{
					index: true,
					handle: { ...route.handle },
				}],
			} as AppRouteRecordRaw;
		}
		return route;
	};

	// 处理路由配置
	const normalizedRoutes = backendRoutes.map(normalizeRouteStructure);
	const transformedRoutes = await Promise.all(
		normalizedRoutes.map(route => transformRoute(route)),
	);

	return addRouteIdByPath(transformedRoutes);
}
