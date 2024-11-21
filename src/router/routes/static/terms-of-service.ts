import type { AppRouteRecordRaw } from "#src/router/types";
import { $t } from "#src/locales";
import { UserOutlined } from "@ant-design/icons";

import { createElement, lazy } from "react";
import { Outlet } from "react-router-dom";

const TermsOfService = lazy(() => import("#src/pages/terms-of-service"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/terms-of-service",
		Component: Outlet,
		handle: {
			hideInMenu: true,
			title: $t("authority.termsOfService"),
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				Component: TermsOfService,
				handle: {
					title: $t("authority.termsOfService"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
