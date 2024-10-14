import { isValidElement } from "react";
import { useTranslation } from "react-i18next";
import { useMatches } from "react-router-dom";

export function Iframe() {
	const matches = useMatches();
	const { t } = useTranslation();
	const currentRoute = matches[matches.length - 1];
	const iframeLink = currentRoute.handle?.iframeLink;
	const routeTitle = currentRoute.handle?.title;

	const title = (
		isValidElement(routeTitle) ? t(routeTitle?.props.children) : routeTitle
	) as string;

	return iframeLink
		? (
			<iframe
				src={iframeLink}
				title={title}
				width="100%"
				height="100%"
				className="border-none"
			/>
		)
		: null;
}
