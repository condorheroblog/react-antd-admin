import { useAuthStore } from "#src/store";
import { rememberRoute } from "#src/utils";

/**
 * 跳转到登录页面
 *
 * @returns 无返回值
 */
export function goLogin() {
	// 重置登录状态
	useAuthStore.getState().reset();
	// 跳转到登录页面，并带上需要记住的路由信息
	window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
}
