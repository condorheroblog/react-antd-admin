import { isString } from "#src/utils";

import { useMatches } from "react-router";

/**
 * 用于权限认证的自定义 Hook。
 *
 * @returns 返回一个函数，该函数用于检查用户是否具有指定权限。
 * 如果用户具有指定权限，则返回 true；否则返回 false。
 */
export function useAuth() {
	const matches = useMatches();
	const currentRoute = matches[matches.length - 1];

	/**
	 *
	 * @param permission 全部小写的权限名称或权限名称数组，比如 `["add", "delete"]`。
	 * @returns boolean 是否具有指定权限
	 */
	const hasAuth = (permission?: string | Array<string>) => {
		if (!permission)
			return false;
		/** 从当前路由的 `handle` 字段里获取按钮级别的所有自定义 `code` 值 */
		const metaAuth = currentRoute?.handle?.permissions;
		if (!metaAuth) {
			return false;
		}
		permission = isString(permission) ? [permission] : permission;
		// 将权限名称转换为按钮级别的权限标识
		permission = permission.map(item => `permission:button:${item.toLowerCase()}`);
		const isAuth = metaAuth.some(item => permission.includes(item));
		return isAuth;
	};
	return hasAuth;
}
