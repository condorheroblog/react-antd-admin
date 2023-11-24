import { UserOutlined } from "@ant-design/icons";
import { createElement } from "react";

import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";
import { t } from "#src/locales";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		id: "about",
		Component: ContainerLayout,
		meta: {
			sort: 100,
			title: t("menus.about"),
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				id: "about_index",
				lazy: async () => {
					const mod = await import("#src/pages/about");
					return {
						...mod,
						Component: mod.default,
					};
				},
				meta: {
					title: t("menus.about"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
