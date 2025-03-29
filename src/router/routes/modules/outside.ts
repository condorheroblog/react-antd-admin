import type { AppRouteRecordRaw } from "#src/router/types";

import { Iframe } from "#src/components/iframe";
import { ReactLogoIcon } from "#src/icons";
import { ContainerLayout } from "#src/layout";
import { $t } from "#src/locales";
import { outside } from "#src/router/extra-info";

import { AntDesignOutlined, ContainerOutlined } from "@ant-design/icons";
import { createElement } from "react";
import { Outlet } from "react-router";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/outside",
		Component: ContainerLayout,
		handle: {
			icon: "OutsidePageIcon",
			title: $t("common.menu.outside"),
			order: outside,
		},
		children: [
			{
				path: "/outside/embedded",
				Component: Outlet,
				handle: {
					icon: "EmbeddedIcon",
					title: $t("common.menu.embedded"),
				},
				children: [
					{
						path: "/outside/embedded/ant-design",
						Component: Iframe,
						handle: {
							icon: createElement(AntDesignOutlined),
							title: $t("common.menu.antd"),
							iframeLink: "https://ant.design/",
						},
					},
					{
						path: "/outside/embedded/project-docs",
						Component: Iframe,
						handle: {
							icon: createElement(ContainerOutlined),
							title: $t("common.menu.projectDocs"),
							iframeLink: "https://condorheroblog.github.io/react-antd-admin/docs/",
						},
					},
				],
			},
			{
				path: "/outside/external-link",
				Component: Outlet,
				handle: {
					icon: "ExternalIcon",
					title: $t("common.menu.externalLink"),
				},
				children: [
					{
						path: "/outside/external-link/react-docs",
						Component: Iframe,
						handle: {
							icon: createElement(ReactLogoIcon),
							title: $t("common.menu.reactDocs"),
							externalLink: "https://react.dev/",
						},
					},
				],
			},
		],
	},
];

export default routes;
