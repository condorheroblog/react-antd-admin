import type { ItemType } from "antd/es/menu/interface";
import type { Location } from "react-router-dom";

import type { AppRouteRecordRaw, RouterNavigate } from "./types";
import { Iframe } from "#src/components/iframe";
import { ContainerLayout } from "#src/layout";
import { t } from "#src/locales";
import Error404 from "#src/pages/404";
import { useUserStore } from "#src/store";

import { isString } from "#src/utils";
import * as antdIcons from "@ant-design/icons";
import { createElement } from "react";
import { Link } from "react-router-dom";

import { ROOT_ROUTE_ID, WHITE_LIST } from "./constants";
import { RouterGuards } from "./guards";

const allAntdIcons: { [key: string]: any } = antdIcons;

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
			Component: Error404,
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
 * @returns 返回菜单项数组，数组元素类型为 ItemType
 */
export function getMenuItems(routeList: AppRouteRecordRaw[]) {
	return routeList.reduce<ItemType[]>((acc, item) => {
		const label = isString(item?.handle?.title) ? t(item.handle?.title) : item.handle?.title;
		const externalLink = item?.handle?.externalLink;
		const iconName = item?.handle?.icon;

		const menuItem: ItemType = {
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
			const noIndexRoute = item.children.filter(route => !route.index);
			if (noIndexRoute.length > 0) {
				// @ts-expect-error: Property 'children' does not exist on type 'MenuItemType'
				menuItem.children = getMenuItems(noIndexRoute);
			}
		}
		if (item?.handle?.hideMenu) {
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

	function traverse(items: AppRouteRecordRaw[]) {
		items.forEach((item) => {
			if (item.index || item.path) {
				result[item.path!] = item;
			}
			if (item.children && item.children.length > 0) {
				traverse(item.children);
			}
		});
	}

	traverse(routes);
	return result;
}

// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob<
	Record<string, React.ComponentType>
>("/src/pages/**/*.tsx");

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
			const index = modulesRoutesKeys.findIndex(ev => ev.includes(v.path!));
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

/* 检查是否是公开路由 */
export function checkPublicRoute(pathname: string, ignoreAccess: boolean) {
	// const { pathname } = routerState.location;
	// const currentRoute = routerState.matches[routerState.matches.length - 1];

	// 白名单内的路由或者路由设置了 ignoreAccess，则不进行校验
	if (WHITE_LIST.has(pathname) || ignoreAccess) {
		return true;
	}
	return false;
}

/* 检查是否登录 */
export function checkRouteRedirection(routerStateLocation: Location, routerNavigate: RouterNavigate) {
	const { pathname, search } = routerStateLocation;

	const isLogin = Boolean(useUserStore.getState().token);
	// 未登录，则跳转到登录页
	if (!isLogin) {
		// pathname 长度大于 1，则携带当前路径跳转登录页
		if (pathname.length > 1) {
			routerNavigate(`/login?redirect=${pathname}${search}`);
			return true;
		}
		else {
			routerNavigate("/login");
			return true;
		}
	}

	// 根路由的重定向
	if (pathname === "/") {
		routerNavigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
		return true;
	}

	return false;
}

/* 检查路由角色 */
export function checkRouteRole(routeRoles: string[], routerNavigate: RouterNavigate) {
	// const currentRoute = routerState.matches[routerState.matches.length - 1];
	// 路由权限校验
	const userRoles = useUserStore.getState().roles;
	// const routeRoles = currentRoute.route.handle?.roles;
	const hasRoutePermission = userRoles.some(role => routeRoles?.includes(role));
	// 未通过权限校验，则跳转到 403 页面，如果路由上没有设置 roles，则默认放行
	if (routeRoles && routeRoles.length && !hasRoutePermission) {
		routerNavigate("/error/403");
		return false;
	}
	return true;
}
