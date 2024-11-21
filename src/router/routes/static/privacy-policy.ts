import type { AppRouteRecordRaw } from "#src/router/types";
import { $t } from "#src/locales";
import { UserOutlined } from "@ant-design/icons";

import { createElement, lazy } from "react";
import { Outlet } from "react-router-dom";

const PrivacyPolicy = lazy(() => import("#src/pages/privacy-policy"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/privacy-policy",
		Component: Outlet,
		handle: {
			hideInMenu: true,
			title: $t("authority.privacyPolicy"),
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				Component: PrivacyPolicy,
				handle: {
					title: $t("authority.privacyPolicy"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
