import { useCurrentRoute } from "#src/hooks";
import { ROUTE_WHITE_LIST } from "#src/router/constants";
import { exception403Path, exception404Path, exception500Path, loginPath } from "#src/router/extra-info";
import { enabledDynamicRouting, isSendRoutingRequest } from "#src/router/routes/config";
import { useAuthStore, usePermissionStore, useUserStore } from "#src/store";
import { NProgress } from "#src/utils";

import { useEffect, useRef } from "react";
import { matchRoutes, Navigate, useLocation, useNavigate } from "react-router";

/**
 * 路由白名单 1. 不进行权限校验， 2. 不会触发请求，例如用户信息接口
 * @example "privacy-policy", "terms-of-service" 等
 */
const noLoginWhiteList = Array.from(ROUTE_WHITE_LIST).filter(item => item !== loginPath);

interface AuthGuardProps {
	children?: React.ReactNode
}

/**
 * AuthGuard 组件，用于权限验证
 *
 * 1. 代码的顺序很重要，不要随意调整
 */
export function AuthGuard({ children }: AuthGuardProps) {
	const navigate = useNavigate();
	const currentRoute = useCurrentRoute();
	// 开启动态路由条件下，标记是否替换过路由
	const isRouteReplaced = useRef(false);
	const { pathname, search } = useLocation();
	const isLogin = useAuthStore(state => Boolean(state.token));
	const isAuthorized = useUserStore(state => Boolean(state.userId));
	const getUserInfo = useUserStore(state => state.getUserInfo);
	const userRoles = useUserStore(state => state.roles);
	const { handleAsyncRoutes, handleSyncRoutes, hasFetchedDynamicRoutes, routeList } = usePermissionStore();

	const isPathInNoLoginWhiteList = noLoginWhiteList.includes(pathname);

	/**
	 * 异步获取用户信息和路由配置
	 */
	useEffect(() => {
		async function fetchUserInfoAndRoutes() {
			// 网速慢时显示加载进度条，防止页面白屏
			NProgress.start();

			// 初始化一个空数组来存放 Promise 对象
			const promises = [];

			// 总是添加获取用户信息的 Promise
			promises.push(getUserInfo());

			// 如果启用了动态路由，则添加处理动态路由的 Promise
			if (enabledDynamicRouting && isSendRoutingRequest) {
				promises.push(handleAsyncRoutes());
			}

			/**
			 * 用户信息包含了用户角色，需要在获取菜单权限前面获取，用于权限校验
			 */
			const results = await Promise.allSettled(promises);
			// 隐藏加载进度条
			NProgress.done();
			const hasError = results.some(result => result.status === "rejected");
			// 启用了动态路由且路由从用户接口中获取
			if (enabledDynamicRouting && !isSendRoutingRequest) {
				await handleSyncRoutes();
			}

			// 网络请求失败，跳转到 500 页面
			if (hasError) {
				const unAuthorized = results.some((result: any) => result.reason.response.status === 401);
				if (!unAuthorized) {
					return navigate(exception500Path);
				}
			}
		}
		/**
		 * 1. 非路由白名单
		 * 2. 已登录
		 * 3. 未获取到用户信息和路由信息
		 */
		if (!isPathInNoLoginWhiteList && isLogin && !isAuthorized) {
			fetchUserInfoAndRoutes();
		}
	}, [isPathInNoLoginWhiteList, isLogin, isAuthorized]);

	/**
	 * 路由白名单
	 * @see {noLoginWhiteList}
	 */
	if (isPathInNoLoginWhiteList) {
		return children;
	}

	/**
	 * 未登录条件下的处理逻辑
	 */
	/* --------------- Start ------------------ */
	if (!isLogin) {
		// 未登录且目标页不是登录页，则跳转到登录页
		if (pathname !== loginPath) {
			// pathname 长度大于 1，则携带当前路径跳转登录页，否则直接跳转登录页
			const redirectPath = pathname.length > 1 ? `${loginPath}?redirect=${pathname}${search}` : loginPath;
			return (
				<Navigate
					to={redirectPath}
					replace
				/>
			);
		}
		// 未登录且目标页是登录页，保留登录页
		else {
			return children;
		}
	}
	/* --------------- End ------------------ */

	/**
	 * 登录条件下的处理逻辑
	 */
	/* --------------- Start ------------------ */
	// 等待获取用户信息
	if (!isAuthorized) {
		return null;
	}
	// 开启动态路由条件下，等待获取路由信息
	if (enabledDynamicRouting && !hasFetchedDynamicRoutes) {
		return null;
	}

	/**
	 * 开启动态路由条件下需要替换当前路由？
	 * 1. 浏览器导航进入动态路由地址，例如 /system/user
	 * 3. 动态路由未添加到路由，所以地址栏中依然是 /system/user 但匹配到的路由是 fallback (path = "*") 路由
	 * 4. 添加完动态路由后，使用 replace 替换当前路由，触发程序重新匹配到 /system/user 路由
	 *
	 * 参考：https://router.vuejs.org/guide/advanced/dynamic-routing#Adding-routes
	 *
	 */

	if (enabledDynamicRouting && hasFetchedDynamicRoutes && !isRouteReplaced.current) {
		isRouteReplaced.current = true;
		return (
			<Navigate
				to={`${pathname}${search}`}
				replace
			/>
		);
	}

	/**
	 * 1. 如果是根路由则跳转到首页
	 * 2. 已登录时匹配 login 路由，跳转到首页
	 */
	if (pathname === import.meta.env.BASE_URL || pathname === loginPath) {
		return (
			<Navigate
				to={import.meta.env.VITE_BASE_HOME_PATH}
				replace
			/>
		);
	}
	/* --------------- End ------------------ */

	/**
	 * 路由权限校验逻辑
	 */
	const routeRoles = currentRoute?.handle?.roles;
	const ignoreAccess = currentRoute?.handle?.ignoreAccess;

	// 忽略权限校验
	if (ignoreAccess === true) {
		return children;
	}

	const matches = matchRoutes(
		routeList,
		pathname,
		import.meta.env.BASE_URL,
	) ?? [];
	const hasChildren = matches[matches.length - 1]?.route?.children?.filter(item => !item.index)?.length;
	// 如果当前路由有子路由，则跳转到 404 页面
	if (hasChildren && hasChildren > 0) {
		return (
			<Navigate
				to={exception404Path}
				replace
			/>
		);
	}

	// 角色权限校验
	const hasRoutePermission = userRoles.some(role => routeRoles?.includes(role));
	/**
	 * 1. 如果路由上没有携带 roles，视为无权限路由，等同于 ignoreAccess 为 true
	 * 2. 未通过权限校验的路由，取消当前路由导航，并转到 403 页面
	 */
	if (routeRoles && routeRoles.length && !hasRoutePermission) {
		return (
			<Navigate
				to={exception403Path}
				replace
			/>
		);
	}

	return children;
}
