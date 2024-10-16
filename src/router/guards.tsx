import { useUserStore } from "#src/store";

import { isValidElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches } from "react-router-dom";

/**
 * RouterGuards 组件用于路由守卫，主要处理路由守卫相关的逻辑。
 *
 * @returns 返回 JSX.Element，用于渲染 Outlet 组件。
 */
export function RouterGuards() {
	const matches = useMatches();
	const { t } = useTranslation();
	const lng = useUserStore(state => state.lng);

	useEffect(() => {
		const currentRoute = matches[matches.length - 1];
		const documentTitle = currentRoute.handle?.title;
		const newTitle = (
			isValidElement(documentTitle)
				? t(documentTitle?.props.children)
				: documentTitle
		) as string;
		document.title = newTitle || document.title;
		/* 切换语言更新文档标题，路由变化更新文档标题的逻辑在 routerAfterEach 函数中 */
	}, [lng]);

	return <Outlet />;
}
