/**
 * 当前路由匹配逻辑：
 * https://mermaid.live/edit#pako:eNqNVF1v0zAU_SuWH6uWD21PfUAqGhqVBqo6EBJJH6zETSySuHIcWDVNGh_TGFtZgW2i0yaK0AYPoAIPFLR1_JkmDU_7Czhx1mXrpi1SrGvfc-451048CzWqY5iHVYs-0UzEOLg3oTpAPNNczJR4rIBc7ga4SWeuKyr0t7772_NBezU8eOcv7Ax6b8RUhRXJikAxuuBxc9JDTFf8V-2w1wNILOSMaOUKd2dAsLHY3_uVsIbgmErcEuJm0blLp6hBnAcm4XiKuFzp_274KwvB8ldgRQkQdjuDtR-DzReZTBK2en6z4TfWM5nD_ZX-wbK_--xwf7PGyGOk1XM1ahGtntAS6fPEgLAC_OZu7KjoxkkleN8RS4PWnt9bvwxf4GP-LUeXaDnGyBIysBJHIAorafwk5vddzIpOlSrh666_ujFY-xK87Pb_fgyedoSyrJPYSjs9rj0CuXTxiHeb2jiqAmRVzcTaoxJmNnFdQhP5CwrFzDL1OGZlSrkStP_InQdXpcuTB3GMTJsdGjkLdNT0KXdK8Gk--LATbD__12oON-sU6IQIMRzKcEHTsOuej95a8r81kxZiWuRr_Nq4Il5Qi87wYqUytfCI0_Dz23Dp59CvbDSNSzcrRceE6FhaNN3CmZ_eaMUUBGahLXKI6OIumI0IKuQmtrEK8yLUcRV5FldhVqZsISKkC5ZQlQhGDFPkVWdOlBK_Op2uOxrMc-bhLGTUM0yYryLLFTOvpiOOJwgyGLKHq1gnnLI78jaKL6UsrCHnIaVHmLn_M6fdRw
 * 1. 初次进入应用
 * 2. 加载 auth-guard.tsx 文件
 * 3. 不包括 login 路由的**路由白名单**，例如：privacy-policy 路由
 * 4. ……
 */

import type { RouteObject } from "react-router";
import LayoutRoot from "#src/layout/layout-root";
import { usePreferencesStore } from "#src/store/preferences";
import { NProgress } from "#src/utils/progress";

import { createBrowserRouter, createHashRouter } from "react-router";
import { ROOT_ROUTE_ID } from "./constants";
import { baseRoutes } from "./routes";

// 记录已经加载的页面
const loadedPaths = new Set<string>();

export const rootRoute: RouteObject[] = [
	{
		path: "/",
		id: ROOT_ROUTE_ID,
		Component: LayoutRoot,
		children: baseRoutes,
		loader: ({ request }) => {
			/**
			 * @zh 初次加载路由时，开始进度条动画
			 * @en Start the progress bar animation when loading routes for the first time
			 */
			const { transitionProgress } = usePreferencesStore.getState();
			if (transitionProgress) {
				NProgress.start();
				const relativePath = new URL(request.url).pathname;
				loadedPaths.add(relativePath);
			}
			return null;
		},
		shouldRevalidate: ({ nextUrl, currentUrl }) => {
			if (nextUrl.pathname === currentUrl.pathname) {
				return false;
			}
			/**
			 * @zh 路由更新时，开始进度条动画
			 * @en Start the progress bar animation when the route is updated
			 */
			const { transitionProgress } = usePreferencesStore.getState();
			const isLoaded = loadedPaths.has(nextUrl.pathname);
			if (transitionProgress && !isLoaded) {
				NProgress.start();
				loadedPaths.add(nextUrl.pathname);
			}
			return false;
		},
	},
];

function createRouter() {
	if (import.meta.env.VITE_ROUTER_MODE === "hash") {
		return createHashRouter(
			rootRoute,
			{
				/**
				 * @zh 路由模式为 hash 时，不需要设置 basename 属性，如果设置 basename 为 `/app`，根路由 `/` 则会变为 `/#/app`
				 * @en When the routing mode is hash, you don't need to set the basename property. If you set it as `/app`, the root route `/` will become `/#/app`.
				 * @see https://reactrouter.com/6.30.0/router-components/hash-router#basename
				 */
				// basename: import.meta.env.BASE_URL,
			},
		);
	}
	return createBrowserRouter(
		rootRoute,
		{
			basename: import.meta.env.BASE_URL,
		},
	);
}

export const router = createRouter();

export default router;
