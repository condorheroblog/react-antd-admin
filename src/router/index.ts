import type { BlockerFunction } from "react-router-dom";
import type { AppRouteRecordRaw, RouterSubscriber } from "./types";

import { usePermissionStore } from "#src/store";
import { NProgress } from "#src/utils";

import { createBrowserRouter, matchRoutes } from "react-router-dom";
import {
	addIdToRoutes,
	checkLogin,
	checkPublicRoute,
	checkRouteRole,
	getInitReactRoutes,
	replaceBaseWithRoot,
} from "./utils";

const modules = import.meta.glob<
	Record<string, { default: AppRouteRecordRaw[] }>
>("./modules/**/*.ts", { eager: true });

export const routeModuleList = Object.keys(modules).reduce<AppRouteRecordRaw[]>(
	(list, key) => {
		const mod = modules[key].default ?? {};
		const modList = Array.isArray(mod) ? [...mod] : [mod];
		return [...list, ...addIdToRoutes(modList)];
	},
	[],
);

export const router = createBrowserRouter(
	getInitReactRoutes(routeModuleList),
	{
		basename: import.meta.env.BASE_URL,
	},
);

/**
 * 全局前置守卫，用于在路由跳转前执行一些操作
 *
 * @returns 返回 true 则取消当前导航，返回 false 则继续导航
 */
const routerBeforeEach: BlockerFunction = ({ nextLocation }) => {
	/* 开启进度条动画 */
	NProgress.start();

	const currentRoute = matchRoutes(
		router.routes,
		nextLocation,
		import.meta.env.BASE_URL,
	) ?? [];
	const { pathname, search } = nextLocation;
	const pathnameWithoutBase = replaceBaseWithRoot(pathname);

	/* 路由白名单 */
	const isPublicRoute = checkPublicRoute(pathnameWithoutBase, currentRoute[currentRoute.length - 1]?.route?.handle?.ignoreAccess);
	if (isPublicRoute) {
		return false;
	}

	/* 是否登录 */
	const isLogin = checkLogin(pathnameWithoutBase, search, router.navigate);
	if (!isLogin) {
		return true;
	}

	/* 跳转到默认路由 */
	if (pathname === import.meta.env.BASE_URL) {
		router.navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
		return true;
	}

	/* --------------- 以下为已登录的处理逻辑 ------------------ */
	// 路由权限校验
	const hasRole = checkRouteRole(currentRoute[currentRoute.length - 1]?.route?.handle?.roles, router.navigate);
	// 未通过权限校验
	if (!hasRole) {
		return true;
	}
	return false;
};

/**
 * 路由守卫，在路由跳转完成后执行
 *
 * @returns 无返回值
 */
const routerAfterEach: RouterSubscriber = (routerState) => {
	if (routerState.navigation.state === "idle") {
		/* 路由变化更新文档标题的逻辑放到了路由守卫组件中（guard.tsx） */
		/* 关闭进度条动画 */
		NProgress.done();
	}
};

async function routerInitReady() {
	/* 路由初始化时，开启进度条动画 */
	NProgress.start();
	function handleDomReady() {
		NProgress.done();
		document.removeEventListener("DOMContentLoaded", handleDomReady);
	}
	document.addEventListener("DOMContentLoaded", handleDomReady);

	const { pathname, search } = router.state.location;
	const pathnameWithoutBase = replaceBaseWithRoot(pathname);
	const currentRoute = router.state.matches[router.state.matches.length - 1];
	/* 路由白名单 */
	const isPublicRoute = checkPublicRoute(pathnameWithoutBase, currentRoute.route.handle?.ignoreAccess);
	if (isPublicRoute) {
		return;
	}

	/* 是否登录 */
	const isLogin = checkLogin(pathnameWithoutBase, search, router.navigate);
	if (!isLogin) {
		return;
	}

	/* --------------- 以下为已登录的处理逻辑 ------------------ */

	// 已登录但未获取动态路由，则获取动态路由
	const { hasFetchedDynamicRoutes, handleAsyncRoutes } = usePermissionStore.getState();
	if (!hasFetchedDynamicRoutes) {
		await handleAsyncRoutes();
		/**
		 * 需要替换当前路由
		 * https://router.vuejs.org/guide/advanced/dynamic-routing#Adding-routes
		 *
		 * 为什么需要替换当前路由？
		 * 1. 假如用户导航到动态路由 /system/user
		 * 2. 浏览器匹配路由，但是没有匹配到，进入 404 路由
		 * 3. 等待获取动态路由后，通过 router.navigate 跳转到 /system/user
		 *
		 */

		return router.navigate(`${pathnameWithoutBase}${search}`);
	}

	// 路由权限校验
	const hasRole = checkRouteRole(currentRoute.route.handle?.roles, router.navigate);
	// 未通过权限校验
	if (!hasRole) {
		return false;
	}
}

export async function setupRouter() {
	router.dispose();
	// router beforeEach
	router.getBlocker("beforeEach", routerBeforeEach);
	// router afterEach
	router.subscribe(routerAfterEach);

	await routerInitReady();
}

export default router;
