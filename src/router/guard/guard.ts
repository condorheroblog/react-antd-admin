import type { ReactRouterType } from "#src/router/types";
import { setupCommonGuard } from "./common-guard";

/**
 * 路由守卫配置
 * @param ReactRouterType
 */
export function createRouterGuard(router: ReactRouterType) {
	/** 通用逻辑守卫 */
	setupCommonGuard(router);
}
