import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout, ParentLayout } from "#src/layout";

import { $t } from "#src/locales";

import { routeNest } from "#src/router/extra-info";
import {
	NodeExpandOutlined,
	SisternodeOutlined,
	SubnodeOutlined,
} from "@ant-design/icons";
import { createElement, lazy } from "react";

const Menu1And1 = lazy(() => import("#src/pages/route-nest/menu1/menu1-1"));
const Menu1And2 = lazy(() => import("#src/pages/route-nest/menu1/menu1-2"));
const Menu2 = lazy(() => import("#src/pages/route-nest/menu2"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/route-nest",
		Component: ContainerLayout,
		handle: {
			order: routeNest,
			title: $t("common.menu.nestMenus"),
			icon: createElement(NodeExpandOutlined),
		},
		children: [
			{
				path: "/route-nest/menu1",
				Component: ParentLayout,
				handle: {
					title: $t("common.menu.menu1"),
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/route-nest/menu1/menu1-1",
						Component: Menu1And1,
						handle: {
							title: $t("common.menu.menu1-1"),
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/route-nest/menu1/menu1-2",
						Component: Menu1And2,
						handle: {
							title: $t("common.menu.menu1-2"),
							icon: createElement(SubnodeOutlined),
						},
					},
				],
			},
			{
				path: "/route-nest/menu2",
				Component: Menu2,
				handle: {
					title: $t("common.menu.menu2"),
					icon: createElement(SubnodeOutlined),
				},
			},
		],
	},
];

export default routes;
