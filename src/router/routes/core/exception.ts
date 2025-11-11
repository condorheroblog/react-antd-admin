import type { AppRouteRecordRaw } from "#src/router/types";

import { ServerErrorIcon } from "#src/icons";
import ContainerLayout from "#src/layout/container-layout";
import { $t } from "#src/locales";
import { exception, exception403Path, exception404Path, exception500Path, exceptionPath, exceptionUnknownComponentPath } from "#src/router/extra-info";

import {
	AppstoreOutlined,
	IssuesCloseOutlined,
	MinusSquareOutlined,
	StopOutlined,
} from "@ant-design/icons";
import { createElement, lazy } from "react";

const Exception403 = lazy(() => import("#src/pages/exception/403"));
const Exception404 = lazy(() => import("#src/pages/exception/404"));
const Exception500 = lazy(() => import("#src/pages/exception/500"));
const ExceptionUnknownComponent = lazy(() => import("#src/pages/exception/unknown-component"));

const routes: AppRouteRecordRaw[] = [
	{
		path: exceptionPath,
		Component: ContainerLayout,
		handle: {
			order: exception,
			// hideInMenu: true,
			title: $t("common.menu.exception"),
			icon: createElement(IssuesCloseOutlined),
		},
		children: [
			{
				path: exception403Path,
				Component: Exception403,
				handle: {
					title: $t("common.menu.exception_403"),
					icon: createElement(StopOutlined),
				},
			},
			{
				path: exception404Path,
				Component: Exception404,
				handle: {
					title: $t("common.menu.exception_404"),
					icon: createElement(MinusSquareOutlined),
				},
			},
			{
				path: exception500Path,
				Component: Exception500,
				handle: {
					title: $t("common.menu.exception_500"),
					icon: createElement(ServerErrorIcon),
				},
			},
			{
				path: exceptionUnknownComponentPath,
				Component: ExceptionUnknownComponent,
				handle: {
					title: $t("common.menu.exceptionUnknownComponent"),
					icon: createElement(AppstoreOutlined),
				},
			},
		],
	},
];

export default routes;
