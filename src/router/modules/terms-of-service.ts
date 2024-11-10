import type { AppRouteRecordRaw } from "../types";
import { $t } from "#src/locales";
import { UserOutlined } from "@ant-design/icons";

import { createElement, lazy } from "react";
import { Outlet } from "react-router-dom";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/terms-of-service",
		Component: Outlet,
		handle: {
			title: $t("authority.termsOfService"),
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				Component: lazy(() => import("#src/pages/terms-of-service")),
				handle: {
					title: $t("authority.termsOfService"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
