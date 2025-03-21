import { PageError } from "#src/components";
import { usePreferences } from "#src/hooks";
import { AuthGuard } from "#src/router/guard";
import { isString, toggleHtmlClass } from "#src/utils";

import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useMatches } from "react-router";

/**
 * 根布局组件
 */
export default function LayoutRoot() {
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
			<AuthGuard>
				<Outlet />
			</AuthGuard>
		</ErrorBoundary>
	);
}
