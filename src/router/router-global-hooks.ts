import type { BlockerFunction } from "react-router";
import type { ReactRouterType, RouterSubscriber } from "./types";

import { useAuthStore, usePermissionStore, usePreferencesStore, useUserStore } from "#src/store";
import { NProgress } from "#src/utils";

import { matchRoutes } from "react-router";

import { LOGIN, ROUTE_WHITE_LIST } from "./constants";
import { isDynamicRoutingEnabled, isSendRoutingRequest } from "./routes/config";
import { replaceBaseWithRoot } from "./utils";

// 不需要登录路由的路由白名单
const noLoginWhiteList = Array.from(ROUTE_WHITE_LIST).filter(item => item !== LOGIN);

/**
 * 全局前置守卫，用于在路由跳转前执行一些操作
 *
 * 触发条件：使用 react-router 中的 navigate、Link 等方法跳转路由时触发
 *
 * @returns 返回 true 则取消当前导航，返回 false 则继续导航
 */
export const routerBeforeEach: (reactRouter: ReactRouterType) => BlockerFunction = reactRouter => ({ nextLocation }) => {
	const { transitionProgress } = usePreferencesStore.getState();
	/* 开启进度条动画 */
	transitionProgress && NProgress.start();

	const matches = matchRoutes(
		reactRouter.routes,
		nextLocation,
		import.meta.env.BASE_URL,
	) ?? [];
	const currentRoute = matches[matches.length - 1];

	const { pathname, search } = nextLocation;
	const pathnameWithoutBase = replaceBaseWithRoot(pathname);

	/* 路由白名单 */
	if (noLoginWhiteList.includes(pathnameWithoutBase)) {
		return false;
	}
	/* 是否登录 */
	const isLogin = Boolean(useAuthStore.getState().token);
	// 未登录
	if (!isLogin) {
		// 未登录且目标页不是登录页，则跳转到登录页
		if (pathnameWithoutBase !== LOGIN) {
			// pathnameWithoutBase 长度大于 1，则携带当前路径跳转登录页
			if (pathnameWithoutBase.length > 1) {
				reactRouter.navigate(`/login?redirect=${pathnameWithoutBase}${search}`);
				return true;
			}
			else {
				reactRouter.navigate("/login");
				return true;
			}
		}
		// 未登录且目标页是登录页，放行
		else {
			return false;
		}
	}

	/* --------------- 以下为已登录的处理逻辑 ------------------ */

	/* --------------- Start ------------------ */
	/* 如果是根路由则跳转到首页 */
	if (pathname === import.meta.env.BASE_URL) {
		reactRouter.navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
		return true;
	}
	/* 已登录时匹配 login 路由，跳转到首页 */
	if (pathnameWithoutBase === "/login") {
		reactRouter.navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
		return true;
	}
	/* --------------- End ------------------ */

	/**
	 * 路由权限校验逻辑
	 */
	const userRoles = useUserStore.getState().roles;
	const routeRoles = currentRoute?.route?.handle?.roles;
	const ignoreAccess = currentRoute?.route?.handle?.ignoreAccess;
	const hasChildren = currentRoute?.route?.children?.filter(item => !item.index)?.length;
	// 忽略权限校验
	if (ignoreAccess === true) {
		return false;
	}
	// 如果当前路由有子路由，则跳转到 404 页面
	if (hasChildren && hasChildren > 0) {
		reactRouter.navigate("/error/404");
		return true;
	}

	// 路由权限校验
	const hasRoutePermission = userRoles.some(role => routeRoles?.includes(role));
	// 未通过权限校验，则跳转到 403 页面，如果路由上没有设置 roles，则默认放行
	if (routeRoles && routeRoles.length && !hasRoutePermission) {
		reactRouter.navigate("/error/403");
		return true;
	}

	return false;
};

/**
 * 路由守卫，在路由跳转完成后执行
 */
export const routerAfterEach: RouterSubscriber = (routerState) => {
	const { transitionProgress } = usePreferencesStore.getState();
	if (routerState.navigation.state === "idle") {
		/* 路由变化更新文档标题的逻辑放到了路由守卫组件中（guard.tsx） */
		/* 关闭进度条动画 */
		transitionProgress && NProgress.done();
	}
};

/**
 * 路由初始化完成后执行（只会执行一次）
 *
 * 为什么需要 routerInitReady ？
 * [应用初次加载/刷新浏览器/浏览器输入地址回车]并不会触发 routerBeforeEach 钩子，所以需要 routerInitReady 模仿一次 routerBeforeEach。
 */
export async function routerInitReady(reactRouter: ReactRouterType) {
	/* 顶部进度条 */
	const { transitionProgress } = usePreferencesStore.getState();
	// 是否开启进度条动画
	if (transitionProgress) {
		NProgress.start();
		function handleDomReady() {
			NProgress.done();
			document.removeEventListener("DOMContentLoaded", handleDomReady);
		}
		document.addEventListener("DOMContentLoaded", handleDomReady);
	}

	const currentRoute = reactRouter.state.matches[reactRouter.state.matches.length - 1];
	const { pathname, search } = reactRouter.state.location;
	const pathnameWithoutBase = replaceBaseWithRoot(pathname);

	/* 路由白名单 */
	if (noLoginWhiteList.includes(pathnameWithoutBase)) {
		return;
	}
	/* 是否登录 */
	const isLogin = Boolean(useAuthStore.getState().token);
	// 未登录
	if (!isLogin) {
		// 未登录且目标页不是登录页，则跳转到登录页
		if (pathnameWithoutBase !== LOGIN) {
			// pathnameWithoutBase 长度大于 1，则携带当前路径跳转登录页
			if (pathnameWithoutBase.length > 1) {
				reactRouter.navigate(`/login?redirect=${pathnameWithoutBase}${search}`);
				return;
			}
			else {
				reactRouter.navigate("/login");
				return;
			}
		}
		// 未登录且目标页是登录页，放行
		else {
			return;
		}
	}

	/* --------------- 以下为已登录的处理逻辑 ------------------ */

	// 已登录，获取动态路由
	const { handleAsyncRoutes, handleSyncRoutes } = usePermissionStore.getState();

	// 初始化一个空数组来存放 Promise 对象
	const promises = [];

	// 总是添加获取用户信息的 Promise
	promises.push(useUserStore.getState().getUserInfo());

	// 如果启用了动态路由，则添加处理动态路由的 Promise
	if (isDynamicRoutingEnabled && isSendRoutingRequest) {
		promises.push(handleAsyncRoutes());
	}

	/**
	 * 用户信息包含了用户角色，需要在获取菜单权限前面获取，用于权限校验
	 */
	const results = await Promise.allSettled(promises);
	const hasError = results.some(result => result.status === "rejected");
	// 启用了动态路由且路由从用户接口中获取
	if (isDynamicRoutingEnabled && !isSendRoutingRequest) {
		await handleSyncRoutes();
	}

	// 网络请求失败，跳转到 500 页面
	if (hasError) {
		const unAuthorized = results.some((result: any) => result.reason.response.status === 401);
		if (!unAuthorized) {
			reactRouter.navigate("/error/500");
		}
		return;
	}

	/* --------------- Start ------------------ */
	// 判断路由跳转逻辑，需要在获取动态路由之后，防止路由跳转直接进入 getBlocker 中然后发送请求，但是 getBlocker 不支持异步
	/* 如果是根路由则跳转到首页 */
	if (pathname === import.meta.env.BASE_URL) {
		reactRouter.navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
		return;
	}

	/* 已登录时匹配 login 路由，跳转到首页 */
	if (pathnameWithoutBase === "/login") {
		reactRouter.navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
		return;
	}

	/**
	 * 需要替换当前路由
	 * https://router.vuejs.org/guide/advanced/dynamic-routing#Adding-routes
	 *
	 * 为什么需要替换当前路由？
	 * 1. 初始化路由
	 * 2. 导航进入动态路由地址，例如 /system/user
	 * 3. 动态路由未添加到路由，所以地址栏中依然是 /system/user 但匹配到的路由是 error/404 路由
	 * 4. 添加完动态路由后，使用 replace 触发地址栏的路径匹配对应的路由
	 *
	 * 注意：navigate 方法调用之后会触发 routerBeforeEach 钩子
	 */

	if (
		isDynamicRoutingEnabled
		/**
		 * 初次导航到动态路由，页面会匹配 404 路由
		 * 表现为：页面路径 currentRoute.pathname 和匹配的路由（currentRoute.route.id）不同，则替换当前路由
		 * 如果是初次导航到静态路由，则不需要触发替换
		 */
		&& currentRoute.pathname !== currentRoute.route.id) {
		/**
		 * 替换当前路由后，会触发 routerBeforeEach 钩子
		 */
		return reactRouter.navigate(`${pathnameWithoutBase}${search}`, { replace: true });
	}

	/**
	 * 纯静态路由，则会支持下面的代码
	 * 路由权限校验逻辑
	 */
	const userRoles = useUserStore.getState().roles;
	const routeRoles = currentRoute?.route?.handle?.roles;
	const ignoreAccess = currentRoute?.route?.handle?.ignoreAccess;
	const hasChildren = currentRoute?.route?.children?.filter(item => !item.index)?.length;
	// 忽略权限校验
	if (ignoreAccess === true) {
		return;
	}
	// 如果当前路由有子路由，则跳转到 404 页面
	if (hasChildren && hasChildren > 0) {
		return reactRouter.navigate("/error/404");
	}

	// 路由权限校验
	const hasRoutePermission = userRoles.some(role => routeRoles?.includes(role));
	// 未通过权限校验，则跳转到 403 页面，如果路由上没有设置 roles，则默认放行
	if (routeRoles && routeRoles.length && !hasRoutePermission) {
		return reactRouter.navigate("/error/403");
	}
}
