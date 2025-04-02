import type { AppRouteRecordRaw } from "#src/router/types";
import { $t } from "#src/locales";

import { lazy } from "react";
import { Outlet } from "react-router";

const PrivacyPolicy = lazy(() => import("#src/pages/privacy-policy"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/privacy-policy",
		Component: Outlet,
		handle: {
			hideInMenu: true,
			title: $t("authority.privacyPolicy"),
		},
		children: [
			{
				index: true,
				Component: PrivacyPolicy,
				handle: {
					title: $t("authority.privacyPolicy"),
				},
			},
		],
	},
];

export default routes;
