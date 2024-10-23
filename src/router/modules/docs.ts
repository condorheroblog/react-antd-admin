import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout, ParentLayout } from "#src/layout";

import { $t } from "#src/locales";

import { docs } from "#src/router/extra-info";
import {
	FileMarkdownOutlined,
	FireOutlined,
	HomeOutlined,
	SlackOutlined,
	TranslationOutlined,
} from "@ant-design/icons";
import { createElement, lazy } from "react";

const DocsIndex = lazy(() => import("#src/pages/docs/index"));
const I18n = lazy(() => import("#src/pages/docs/guide/i18n"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/docs",
		Component: ContainerLayout,
		handle: {
			order: docs,
			ignoreAccess: true,
			title: $t("common.menu.docs"),
			icon: createElement(FileMarkdownOutlined),
		},
		children: [
			{
				path: "/docs/index",
				Component: DocsIndex,
				handle: {
					title: $t("common.menu.home"),
					icon: createElement(HomeOutlined),
					ignoreAccess: true,
				},
			},
			{
				path: "/docs/guide",
				Component: ParentLayout,
				handle: {
					title: $t("common.menu.guide"),
					icon: createElement(SlackOutlined),
					ignoreAccess: true,
				},
				children: [
					{
						path: "/docs/guide/introduction",
						Component: DocsIndex,
						handle: {
							title: $t("common.menu.introduction"),
							icon: createElement(FireOutlined),
							ignoreAccess: true,
						},
					},
					{
						path: "/docs/guide/i18n",
						Component: I18n,
						handle: {
							title: $t("common.menu.i18n"),
							icon: createElement(TranslationOutlined),
							ignoreAccess: true,
						},
					},
				],
			},
		],
	},
];

export default routes;
