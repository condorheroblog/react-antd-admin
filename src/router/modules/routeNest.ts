import {
	NodeExpandOutlined,
	SisternodeOutlined,
	SubnodeOutlined,
} from "@ant-design/icons";
import { createElement } from "react";

import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";
import { t } from "#src/locales";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/route-nest",
		id: "route-nest",
		Component: ContainerLayout,
		meta: {
			sort: 10,
			title: t("menus.nestMenus"),
			icon: createElement(NodeExpandOutlined),
		},
		children: [
			{
				path: "/route-nest/menu1",
				id: "route-nest_menu1",
				lazy: async () => {
					const mod = await import("#src/layout");
					return {
						...mod,
						Component: mod.ParentLayout,
					};
				},
				meta: {
					title: t("menus.menu1"),
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/route-nest/menu1/menu1-1",
						id: "route-nest_menu1_menu1-1",
						lazy: async () => {
							const mod = await import("#src/pages/route-nest/menu1/menu1-1");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: t("menus.menu1-1"),
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/route-nest/menu1/menu1-2",
						id: "route-nest_menu1_menu1-2",
						lazy: async () => {
							const mod = await import("#src/pages/route-nest/menu1/menu1-2");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: t("menus.menu1-2"),
							icon: createElement(SubnodeOutlined),
						},
					},
				],
			},
			{
				path: "/route-nest/menu2",
				id: "route-nest_menu2",
				lazy: async () => {
					const mod = await import("#src/pages/route-nest/menu2");
					return {
						...mod,
						Component: mod.default,
					};
				},
				meta: {
					title: t("menus.menu2"),
					icon: createElement(SubnodeOutlined),
				},
			},
		],
	},
];

export default routes;
