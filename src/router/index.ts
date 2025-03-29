/**
 * 当前路由匹配逻辑：
 * https://mermaid.live/edit#pako:eNqNVF1v0zAU_SuWH6uWD21PfUAqGhqVBqo6EBJJH6zETSySuHIcWDVNGh_TGFtZgW2i0yaK0AYPoAIPFLR1_JkmDU_7Czhx1mXrpi1SrGvfc-451048CzWqY5iHVYs-0UzEOLg3oTpAPNNczJR4rIBc7ga4SWeuKyr0t7772_NBezU8eOcv7Ax6b8RUhRXJikAxuuBxc9JDTFf8V-2w1wNILOSMaOUKd2dAsLHY3_uVsIbgmErcEuJm0blLp6hBnAcm4XiKuFzp_274KwvB8ldgRQkQdjuDtR-DzReZTBK2en6z4TfWM5nD_ZX-wbK_--xwf7PGyGOk1XM1ahGtntAS6fPEgLAC_OZu7KjoxkkleN8RS4PWnt9bvwxf4GP-LUeXaDnGyBIysBJHIAorafwk5vddzIpOlSrh666_ujFY-xK87Pb_fgyedoSyrJPYSjs9rj0CuXTxiHeb2jiqAmRVzcTaoxJmNnFdQhP5CwrFzDL1OGZlSrkStP_InQdXpcuTB3GMTJsdGjkLdNT0KXdK8Gk--LATbD__12oON-sU6IQIMRzKcEHTsOuej95a8r81kxZiWuRr_Nq4Il5Qi87wYqUytfCI0_Dz23Dp59CvbDSNSzcrRceE6FhaNN3CmZ_eaMUUBGahLXKI6OIumI0IKuQmtrEK8yLUcRV5FldhVqZsISKkC5ZQlQhGDFPkVWdOlBK_Op2uOxrMc-bhLGTUM0yYryLLFTOvpiOOJwgyGLKHq1gnnLI78jaKL6UsrCHnIaVHmLn_M6fdRw
 * 1. 初次进入应用
 * 2. 加载 auth-guard.tsx 文件
 * 3. 不包括 login 路由的**路由白名单**，例如：privacy-policy 路由
 * 4. ……
 */

import { LayoutRoot } from "#src/layout";

import { createBrowserRouter } from "react-router";
import { ROOT_ROUTE_ID } from "./constants";
import { createRouterGuard } from "./guard";
import { baseRoutes } from "./routes";

export const rootRoute = [
	{
		path: "/",
		id: ROOT_ROUTE_ID,
		Component: LayoutRoot,
		children: baseRoutes,
	},
];

export const router = createBrowserRouter(
	rootRoute,
	{
		basename: import.meta.env.BASE_URL,
	},
);

export async function setupRouter() {
	createRouterGuard(router);
}

export default router;
