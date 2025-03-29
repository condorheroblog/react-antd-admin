import { useUserStore } from "#src/store";
import { isString } from "#src/utils";

import { useMatches } from "react-router";
import { accessControlCodes, AccessControlRoles } from "./constants";

export * from "./constants";

/**
 * @zh 权限判断
 * @en Access judgment
 */
export function useAccess() {
	const matches = useMatches();
	const { roles: userRoles } = useUserStore();
	const currentRoute = matches[matches.length - 1];

	/**
	 * @zh 根据权限代码判断当前路由是否具有指定权限
	 * @en Determine whether the current route has a specified permission based on permission codes
	 * @param permission 全部小写的权限名称或权限名称数组，比如 `["add", "delete"]`。
	 * @returns boolean 是否具有指定权限
	 */
	const hasAccessByCodes = (permission?: string | Array<string>) => {
		if (!permission)
			return false;
		/** 从当前路由的 `handle` 字段里获取按钮级别的所有自定义 `code` 值 */
		const metaAuth = currentRoute?.handle?.permissions;
		if (!metaAuth) {
			return false;
		}
		permission = isString(permission) ? [permission] : permission;
		permission = permission.map(item => item.toLowerCase());
		// 校验权限代码是否合法，不合法的权限代码会打印警告信息
		for (const code of permission) {
			if (!Object.values(accessControlCodes).includes(code)) {
				console.warn(`[hasAccessByCodes]: '${code}' is not a valid permission code`);
			}
		}
		const isAuth = metaAuth.some(item => permission.includes(item.toLowerCase()));
		return isAuth;
	};

	/**
	 * @zh 根据角色判断当前用户是否具有指定权限，当前系统设计为输入角色 id 来判断的
	 * @en Determine whether the current user has a specified permission based on roles
	 * @param roles 全部小写的权限名称或权限名称数组，比如 `["admin", "super", "user"]`。
	 * @returns boolean 是否具有指定权限
	 */
	const hasAccessByRoles = (roles?: string | Array<string>) => {
		if (!roles || !userRoles) {
			return false;
		}
		roles = isString(roles) ? [roles] : roles;
		roles = roles.map(item => item.toLowerCase());
		// 校验角色是否合法，不合法的角色会打印警告信息
		for (const roleItem of roles) {
			if (!Object.values(AccessControlRoles).includes(roleItem)) {
				console.warn(`[hasAccessByRoles]: '${roleItem}' is not a valid role`);
			}
		}
		const isAuth = userRoles.some(item => roles.includes(item.toLowerCase()));
		return isAuth;
	};

	return { hasAccessByCodes, hasAccessByRoles };
}
