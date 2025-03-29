import type { ReactNode } from "react";

import { useAccess } from "#src/hooks";

interface AccessControlProps {
	// 权限类型，默认为 code
	type?: "code" | "role"
	// 权限值，可以是字符串或字符串数组
	codes?: string | string[]
	children?: ReactNode
	// 无权限时显示，默认无权限不显示任何内容。
	fallback?: ReactNode
}

/**
 * 权限验证组件
 *
 * @param AccessControlProps 权限验证组件的属性
 * @returns 若子组件存在，并且传入的权限值有效，则返回子组件；否则返回 null
 */
export function AccessControl({ type = "code", codes, children, fallback }: AccessControlProps) {
	const { hasAccessByCodes, hasAccessByRoles } = useAccess();

	if (!children)
		return null;

	if (!type || type === "code") {
		return hasAccessByCodes(codes) ? children : fallback;
	}

	if (type === "role") {
		return hasAccessByRoles(codes) ? children : fallback;
	}

	return fallback;
}
