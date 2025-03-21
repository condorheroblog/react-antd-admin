import type { RouteObject } from "react-router";

import { lazy } from "react";

const NotFound = lazy(() => import("#src/pages/exception/404"));

const routes: RouteObject[] = [
	{
		path: "*",
		id: "404",
		Component: NotFound,
		handle: {
			title: "404",
			hideInMenu: true,
		},
	},
];

export default routes;
