import type { AppRouteRecordRaw } from "../types";
import { $t } from "#src/locales";
import { UserOutlined } from "@ant-design/icons";

import { createElement, lazy } from "react";
import { Outlet } from "react-router-dom";

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
				Component: lazy(() => import("#src/pages/privacy-policy")),
				handle: {
					title: $t("authority.privacyPolicy"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
