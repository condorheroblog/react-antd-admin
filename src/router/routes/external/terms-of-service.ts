import type { AppRouteRecordRaw } from "#src/router/types";
import { $t } from "#src/locales";

import { lazy } from "react";
import { Outlet } from "react-router";

const TermsOfService = lazy(() => import("#src/pages/terms-of-service"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/terms-of-service",
		Component: Outlet,
		handle: {
			hideInMenu: true,
			title: $t("authority.termsOfService"),
		},
		children: [
			{
				index: true,
				Component: TermsOfService,
				handle: {
					title: $t("authority.termsOfService"),
				},
			},
		],
	},
];

export default routes;
