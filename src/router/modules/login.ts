import type { AppRouteRecordRaw } from "../types";

import { $t } from "#src/locales";
import { login } from "#src/router/extra-info";
import { lazy } from "react";
import { LOGIN } from "../constants";

const Login = lazy(() => import("#src/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: LOGIN,
		Component: Login,
		handle: {
			hideInMenu: true,
			title: $t("common.login"),
			order: login,
		},
	},
];

export default routes;
