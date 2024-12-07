import { usePreferences } from "#src/hooks";
import PageError from "#src/pages/error/page-error";
import { isString, toggleHtmlClass } from "#src/utils";

import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useMatches } from "react-router";

/**
 * RouterGuards 组件用于路由守卫，主要处理路由守卫相关的逻辑。
 *
 * @returns 返回 JSX.Element，用于渲染 Outlet 组件。
 */
export function RouterGuards() {
	const matches = useMatches();
	const { t } = useTranslation();
	const location = useLocation();
	const { language, isDark } = usePreferences();

	/* document title */
	useEffect(() => {
		const currentRoute = matches[matches.length - 1];
		const documentTitle = currentRoute.handle?.title as React.ReactElement | string;
		const newTitle = isString(documentTitle) ? documentTitle : documentTitle?.props?.children;
		document.title = t(newTitle) || document.title;
	}, [language, location]);

	/* tailwind theme */
	useEffect(() => {
		if (isDark) {
			toggleHtmlClass("dark").add();
		}
		else {
			toggleHtmlClass("dark").remove();
		}
	}, [isDark]);

	return (
		<ErrorBoundary FallbackComponent={PageError}>
			<Outlet />
		</ErrorBoundary>
	);
}
