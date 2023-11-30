import {
	NodeExpandOutlined,
	SisternodeOutlined,
	SubnodeOutlined,
} from "@ant-design/icons";
import { createElement, lazy } from "react";

import type { AppRouteRecordRaw } from "../types";

import { ContainerLayout } from "#src/layout";
import { t } from "#src/locales";

const ParentLayout = lazy(() => import("#src/layout/parent-layout"));
const Menu1And1 = lazy(() => import("#src/pages/route-nest/menu1/menu1-1"));
const Menu1And2 = lazy(() => import("#src/pages/route-nest/menu1/menu1-2"));
const Menu2 = lazy(() => import("#src/pages/route-nest/menu2"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/route-nest",
		id: "route-nest",
		Component: ContainerLayout,
		handle: {
			sort: 10,
			title: t("global.menus.nestMenus"),
			icon: createElement(NodeExpandOutlined),
		},
		children: [
			{
				path: "/route-nest/menu1",
				id: "route-nest_menu1",
				Component: ParentLayout,
				handle: {
					title: t("global.menus.menu1"),
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/route-nest/menu1/menu1-1",
						id: "route-nest_menu1_menu1-1",
						Component: Menu1And1,
						handle: {
							title: t("global.menus.menu1-1"),
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/route-nest/menu1/menu1-2",
						id: "route-nest_menu1_menu1-2",
						Component: Menu1And2,
						handle: {
							title: t("global.menus.menu1-2"),
							icon: createElement(SubnodeOutlined),
						},
					},
				],
			},
			{
				path: "/route-nest/menu2",
				id: "route-nest_menu2",
				Component: Menu2,
				handle: {
					title: t("global.menus.menu2"),
					icon: createElement(SubnodeOutlined),
				},
			},
		],
	},
];

export default routes;
