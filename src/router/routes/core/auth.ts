import type { AppRouteRecordRaw } from "#src/router/types";

import { $t } from "#src/locales";
import { LOGIN } from "#src/router/constants";

import { lazy } from "react";

const Login = lazy(() => import("#src/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: LOGIN,
		Component: Login,
		handle: {
			hideInMenu: true,
			title: $t("authority.login"),
		},
	},
];

export default routes;
