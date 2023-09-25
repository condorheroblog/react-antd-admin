import { NodeExpandOutlined, SisternodeOutlined, SubnodeOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/route-nest",
		id: "route-nest",
		lazy: async () => {
			const mod = await import("#src/layout");
			return {
				...mod,
				Component: mod.ParentLayout,
			};
		},
		meta: {
			title: "多级菜单",
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
					title: "menu1",
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/route-nest/menu1/menu1-1",
						id: "route-nest_menu1_menu1-1",
						lazy: async () => {
							const mod = await import("#src/pages/routeNest/menu1/menu1-1");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "menu1-1",
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/route-nest/menu1/menu1-2",
						id: "route-nest_menu1_menu1-2",
						lazy: async () => {
							const mod = await import("#src/pages/routeNest/menu1/menu1-2");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "menu1-2",
							icon: createElement(SubnodeOutlined),
						},
					},
				],
			},
			{
				path: "/route-nest/menu2",
				id: "route-nest_menu2",
				lazy: async () => {
					const mod = await import("#src/pages/routeNest/menu2");
					return {
						...mod,
						Component: mod.default,
					};
				},
				meta: {
					title: "menu2",
					icon: createElement(SubnodeOutlined),
				},
			},
		],
	},
];

export default routes;
