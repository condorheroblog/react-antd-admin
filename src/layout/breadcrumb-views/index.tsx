import type { BreadcrumbProps } from "antd";
import { useUserStore } from "#src/store";
import { isString } from "#src/utils";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";

import { useMatches } from "react-router-dom";

const itemRender: BreadcrumbProps["itemRender"] = (route, params, routes) => {
	const last = routes.indexOf(route) === routes.length - 1;
	return last || !route.path
		? (
			<span>{route.title}</span>
		)
		: (
			<span>{route.title}</span>
			// <NavLink to={route.path}>{route.title}</NavLink>
		);
};

export default function BreadcrumbViews() {
	const { t } = useTranslation();
	const lng = useUserStore(state => state.lng);
	const matches = useMatches();

	return (
		<Breadcrumb
			key={lng}
			className="hidden md:block"
			separator="->"
			// https://ant.design/components/breadcrumb#use-with-browserhistory
			itemRender={itemRender}
			items={matches
				.filter(match => match.handle)
				.map((match) => {
					return {
						title: isString(match.handle?.title) ? t(match.handle?.title) : match.handle?.title,
						path: match.pathname,
					};
				})}
		/>
	);
}
