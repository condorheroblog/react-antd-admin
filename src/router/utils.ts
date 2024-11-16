import type { MenuItemType } from "#src/layout/layout-menu/types";
import type { AppRouteRecordRaw } from "./types";
import { Iframe } from "#src/components/iframe";

import { ContainerLayout } from "#src/layout";
import { $t } from "#src/locales";
import { isString } from "#src/utils";
import * as antdIcons from "@ant-design/icons";
import { createElement, lazy } from "react";

import { Link } from "react-router-dom";

import { ROOT_ROUTE_ID } from "./constants";
import { RouterGuards } from "./guards";

const allAntdIcons: { [key: string]: any } = antdIcons;
const ErrorBoundaryComponent = lazy(() => import("#src/pages/error/404"));

export function getInitReactRoutes(routeModuleList: AppRouteRecordRaw[]) {
	return [
		{
			path: "/",
			id: ROOT_ROUTE_ID,
			Component: RouterGuards,
			children: routeModuleList,
		},
		{
			path: "*",
			id: "errorBoundary-route",
			Component: ErrorBoundaryComponent,
		},
	];
}

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

/**
 * 根据路由列表生成菜单项数组
 *
 * @param routeList 路由列表，类型为 AppRouteRecordRaw 数组
 * @returns 返回菜单项数组，数组元素类型为 MenuItemType
 */
export function getMenuItems(routeList: AppRouteRecordRaw[]) {
	return routeList.reduce<MenuItemType[]>((acc, item) => {
		const label = isString(item?.handle?.title) ? $t(item.handle?.title) : item.handle?.title;
		const externalLink = item?.handle?.externalLink;
		const iconName = item?.handle?.icon;

		const menuItem: MenuItemType = {
			key: item.path!,
			icon: isString(iconName) ? createElement(allAntdIcons[iconName]) : iconName,
			label: externalLink
				? createElement(
					Link,
					{ to: externalLink, target: "_blank", rel: "noopener noreferrer" },
					label,
				)
				: (
					label
				),
		};
		if (Array.isArray(item.children) && item.children.length > 0) {
			// 过滤掉非首页，且不显示在菜单中的路由
			const noIndexRoute = item.children.filter(route => !route.index && !route?.handle?.hideInMenu);
			if (noIndexRoute.length > 0) {
				menuItem.children = getMenuItems(noIndexRoute);
			}
		}
		if (item?.handle?.hideInMenu) {
			return acc;
		}
		return [...acc, menuItem];
	}, []);
}

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

/**
 * 将路由数组扁平化为一个以路径为键，层级和索引为值的对象
 *
 * @param routes 路由数组
 * @returns 扁平化后的路由对象，以路径为键，层级和索引为值
 */

export function flattenRoutes(routes: AppRouteRecordRaw[]) {
	const result: Record<string, AppRouteRecordRaw> = {};

	function traverse(items: AppRouteRecordRaw[], parent?: AppRouteRecordRaw) {
		items.forEach((item) => {
			if (item.index && parent?.path) {
				result[`${parent.path}/`] = item;
			}
			if (item.path) {
				result[item.path] = item;
			}
			if (item.children && item.children.length > 0) {
				traverse(item.children, item);
			}
		});
	}

	traverse(routes);
	return result;
}

// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob<
	Record<string, React.ComponentType>
>([
	"/src/pages/**/*.tsx",
	// Fix plugin vite:reporter
	"!/src/pages/error/page-error/*.tsx",
]);

/** 过滤后端传来的动态路由 重新生成规范路由 */
export function addAsyncRoutes(arrRoutes: Array<AppRouteRecordRaw>) {
	if (!arrRoutes || !arrRoutes.length)
		return [];
	const modulesRoutesKeys = Object.keys(modulesRoutes);
	arrRoutes.forEach((v: AppRouteRecordRaw) => {
		// 将 backstage 属性加入 handle，标识此路由为后端返回路由
		v.handle.backstage = true;

		if (v.handle?.iframeLink) {
			v.Component = Iframe;
		}
		else if (v.children && v.children?.length) {
			v.Component = ContainerLayout;
		}
		else {
			const routePath = v.path!;
			const index = modulesRoutesKeys.findIndex(ev => ev === `/src/pages${routePath}/index.tsx`);
			// https://github.com/remix-run/react-router/tree/dev/examples/lazy-loading-router-provider
			// https://reactrouter.com/en/main/route/lazy
			v.lazy = async () => {
				const DefaultComponent = await modulesRoutes[modulesRoutesKeys[index]]();
				return {
					Component: DefaultComponent.default,
				};
			};
		}
		if (v?.children && v.children.length) {
			addAsyncRoutes(v.children);
		}
	});
	return addIdToRoutes(arrRoutes);
}

/**
 * 将基础路径替换为根路径
 * 假如开启了 Vite 的 base 配置，React Router Location.pathname 获取到的路径前面有 base
 * 开发的时候是不根据 base 开发的，所以当使用判断逻辑，或者导航到 pathname 需要将 base 去掉
 *
 * 开始 base:
 * 生产：/base/about
 * 开发：/about
 *
 * @param pathname 当前路径
 * @returns 替换后的路径
 */
export function replaceBaseWithRoot(pathname: string) {
	const base = import.meta.env.BASE_URL;

	if (pathname.length > 1) {
		return pathname.slice(base.length - 1);
	}

	return pathname;
}

/**
 * 移除路径末尾的斜杠
 * @param {string} pathname - 需要处理的路径
 * @returns {string} 移除末尾斜杠后的路径
 * @example
 * removeTrailingSlash('/about/') // 返回 '/about'
 * removeTrailingSlash('/about')  // 返回 '/about'
 */
export function removeTrailingSlash(pathname: string) {
	return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
