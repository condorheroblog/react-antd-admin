import type { BreadcrumbProps } from "antd";
import { useUserStore } from "#src/store";
import { Breadcrumb } from "antd";
import { createUseStyles } from "react-jss";

import { useMatches } from "react-router-dom";

const useStyles = createUseStyles({
	breadcrumbViews: {
		margin: "0",
	},
});

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
	const lng = useUserStore(state => state.lng);
	const matches = useMatches();
	const classes = useStyles();

	return (
		<Breadcrumb
			key={lng}
			className={classes.breadcrumbViews}
			separator="->"
			// https://ant.design/components/breadcrumb#use-with-browserhistory
			itemRender={itemRender}
			items={matches
				.filter(match => match.handle)
				.map((match) => {
					return {
						title: match.handle?.title,
						path: match.pathname,
					};
				})}
		/>
	);
}
