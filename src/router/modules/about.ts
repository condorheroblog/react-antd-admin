import { UserOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

import type { AppRouteRecordRaw } from "../types";

import { ContainerLayout } from "#src/layout";
import { t } from "#src/locales";

const About = lazy(() => import("#src/pages/about"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		id: "about",
		Component: ContainerLayout,
		handle: {
			sort: 100,
			title: t("global.menus.about"),
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				id: "about_index",
				Component: About,
				handle: {
					title: t("global.menus.about"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
