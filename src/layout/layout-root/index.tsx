import { PageError } from "#src/components";
import { usePreferences } from "#src/hooks";
import { AuthGuard } from "#src/router/guard";
import { whiteRouteNames } from "#src/router/routes";
import { useAuthStore, useUserStore } from "#src/store";
import { isString, NProgress, toggleHtmlClass } from "#src/utils";

import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useMatches } from "react-router";

/**
 * @zh 根布局组件
 * @en Root layout component
 */
export default function LayoutRoot() {
	const matches = useMatches();
	const { t } = useTranslation();
	const location = useLocation();
	const { language, isDark, enableDynamicTitle } = usePreferences();
	const isLogin = useAuthStore(state => Boolean(state.token));
	const isAuthorized = useUserStore(state => Boolean(state.id));

	/* document title */
	useEffect(() => {
		if (!enableDynamicTitle) {
			return;
		}
		/**
		 * @zh authGuardDependencies 为将要请求用户信息的 useEffect 的依赖项，如果为 true 当前路由为 404 路由，则不替换 document.title
		 * @en authGuardDependencies is the dependency of useEffect that will request user information. If it's true,
		 */
		const authGuardDependencies = !whiteRouteNames.includes(location.pathname) && isLogin && !isAuthorized;
		if (!authGuardDependencies) {
			const currentRoute = matches[matches.length - 1];
			const documentTitle = currentRoute.handle?.title as React.ReactElement | string;
			const newTitle = isString(documentTitle) ? documentTitle : documentTitle?.props?.children;
			document.title = t(newTitle) || document.title;
		}
	}, [enableDynamicTitle, language, location]);

	/* tailwind theme */
	useEffect(() => {
		if (isDark) {
			toggleHtmlClass("dark").add();
		}
		else {
			toggleHtmlClass("dark").remove();
		}
	}, [isDark]);

	/**
	 * @zh 关闭页面加载进度条，配合 ROOT_ROUTE_ID 路由的 loader 和 shouldRevalidate 使用
	 * @en Close the page loading progress bar, used with the loader and shouldRevalidate of the ROOT_ROUTE_ID route
	 */
	useEffect(() => {
		NProgress.done();
	}, [location.pathname]);

	return (
		<ErrorBoundary FallbackComponent={PageError}>
			<AuthGuard>
				<Outlet />
			</AuthGuard>
		</ErrorBoundary>
	);
}
