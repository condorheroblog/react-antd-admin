import type { AppRouteRecordRaw } from "../types";

import { t } from "#src/locales";

import { lazy } from "react";

const Login = lazy(() => import("#src/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/login",
		Component: Login,
		handle: {
			hideMenu: true,
			title: t("common.login"),
			sort: 101,
		},
	},
];

export default routes;
