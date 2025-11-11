import type { AppRouteRecordRaw } from "#src/router/types";

import { accessControlCodes } from "#src/hooks/use-access/constants";
import ContainerLayout from "#src/layout/container-layout";
import { $t } from "#src/locales";
import { access } from "#src/router/extra-info";

import { lazy } from "react";

const PageControl = lazy(() => import("#src/pages/access/page-control"));
const ButtonControl = lazy(() => import("#src/pages/access/button-control"));
const AdminVisible = lazy(() => import("#src/pages/access/admin-visible"));
const CommonVisible = lazy(() => import("#src/pages/access/common-visible"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/access",
		Component: ContainerLayout,
		handle: {
			icon: "SafetyOutlined",
			title: $t("common.menu.access"),
			order: access,
		},
		children: [
			{
				path: "/access/page-control",
				Component: PageControl,
				handle: {
					icon: "FileTextOutlined",
					title: $t("common.menu.pageControl"),
					permissions: [
						accessControlCodes.get,
					],
				},
			},
			{
				path: "/access/button-control",
				Component: ButtonControl,
				handle: {
					icon: "LockOutlined",
					title: $t("common.menu.buttonControl"),
				},
			},
			{
				path: "/access/admin-visible",
				Component: AdminVisible,
				handle: {
					icon: "EyeOutlined",
					title: $t("common.menu.adminVisible"),
					roles: ["admin"],
				},
			},
			{
				path: "/access/common-visible",
				Component: CommonVisible,
				handle: {
					icon: "EyeOutlined",
					title: $t("common.menu.commonVisible"),
					roles: ["common"],
				},
			},
		],
	},
];

export default routes;
