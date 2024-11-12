import type { ReactNode } from "react";

import { useAuth } from "#src/hooks";

interface AuthProps {
	// 权限值，可以是字符串或字符串数组
	permission?: string | string[]
	children?: ReactNode
	// 无权限时显示，默认无权限不显示任何内容。
	fallback?: ReactNode
}

/**
 * 权限验证组件
 *
 * @param AuthProps 权限验证组件的属性
 * @returns 若子组件存在，并且传入的权限值有效，则返回子组件；否则返回 null
 */
export function Auth({ permission, children, fallback }: AuthProps) {
	const hasAuth = useAuth();

	if (!children)
		return null;

	return hasAuth(permission) ? children : fallback;
}
