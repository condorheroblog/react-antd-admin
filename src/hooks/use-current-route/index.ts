import { useMemo } from "react";
import { useMatches } from "react-router";

/**
 * 获取当前路由信息
 *
 * @returns 当前路由的匹配结果
 */
export function useCurrentRoute() {
	const matches = useMatches();

	const currentRoute = useMemo(() => {
		const match = matches[matches.length - 1];

		return match;
	}, [matches, location]);

	return currentRoute;
}
