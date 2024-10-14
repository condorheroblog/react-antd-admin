import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

import { t } from "#src/locales";

import { UserOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

const About = lazy(() => import("#src/pages/about"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		Component: ContainerLayout,
		handle: {
			sort: 100,
			title: t("common.menu.about"),
			icon: createElement(UserOutlined),
		},
		children: [
			{
				index: true,
				Component: About,
				handle: {
					title: t("common.menu.about"),
					icon: createElement(UserOutlined),
				},
			},
		],
	},
];

export default routes;
