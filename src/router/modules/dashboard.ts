import { DashboardOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/dashboard",
		id: "dashboard",
		Component: ContainerLayout,
		meta: {
			sort: 1,
			title: "dashboard",
			icon: createElement(DashboardOutlined),
		},
		children: [
			{
				index: true,
				id: "dashboard_index",
				lazy: async () => {
					const mod = await import("#src/pages/dashboard");
					return {
						...mod,
						Component: mod.default,
					};
				},
				meta: {
					title: "dashboard",
					icon: createElement(DashboardOutlined),
				},
			},
		],
	},
];

export default routes;
