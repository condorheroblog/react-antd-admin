import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

import { t } from "#src/locales";

import { error } from "#src/router/extra-info";
import {
	IssuesCloseOutlined,
	MinusSquareOutlined,
	StopOutlined,
} from "@ant-design/icons";
import { createElement, lazy } from "react";

const Error403 = lazy(() => import("#src/pages/error/403"));
const Error404 = lazy(() => import("#src/pages/error/404"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/error",
		Component: ContainerLayout,
		handle: {
			order: error,
			title: t("common.menu.exception"),
			icon: createElement(IssuesCloseOutlined),
		},
		children: [
			{
				path: "/error/403",
				Component: Error403,
				handle: {
					title: t("common.menu.exception_403"),
					icon: createElement(StopOutlined),
				},
			},
			{
				path: "/error/404",
				Component: Error404,
				handle: {
					title: t("common.menu.exception_404"),
					icon: createElement(MinusSquareOutlined),
				},
			},
		],
	},
];

export default routes;
