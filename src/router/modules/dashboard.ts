import { DashboardOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const Dashboard = lazy(() => import("#src/pages/dashboard"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/dashboard",
		id: "dashboard",
		Component: ContainerLayout,
		meta: {
			sort: 1,
			title: "Dashboard",
			icon: createElement(DashboardOutlined),
		},
		children: [
			{
				index: true,
				id: "dashboard_index",
				Component: Dashboard,
				meta: {
					title: "Dashboard",
					icon: createElement(DashboardOutlined),
				},
			},
		],
	},
];

export default routes;
