import { lazy } from "react";

import type { AppRouteRecordRaw } from "../types";

import { t } from "#src/locales";

const Login = lazy(() => import("#src/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/login",
		id: "login",
		Component: Login,
		handle: {
			hideMenu: true,
			title: t("global.common.login"),
			sort: 101,
		},
	},
];

export default routes;
