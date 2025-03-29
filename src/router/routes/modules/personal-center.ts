import type { AppRouteRecordRaw } from "#src/router/types";
import { ProfileIcon, UserCircleIcon, UserSettingsIcon } from "#src/icons";
import { ContainerLayout } from "#src/layout";
import { $t } from "#src/locales";
import { personalCenter } from "#src/router/extra-info";

import { createElement, lazy } from "react";

const MyProfile = lazy(() => import("#src/pages/personal-center/my-profile"));
const Settings = lazy(() => import("#src/pages/personal-center/settings"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/personal-center",
		Component: ContainerLayout,
		handle: {
			order: personalCenter,
			title: $t("common.menu.personalCenter"),
			icon: createElement(UserCircleIcon),
		},
		children: [
			{
				path: "/personal-center/my-profile",
				Component: MyProfile,
				handle: {
					title: $t("common.menu.profile"),
					icon: createElement(ProfileIcon),
				},
			},
			{
				path: "/personal-center/settings",
				Component: Settings,
				handle: {
					title: $t("common.menu.settings"),
					icon: createElement(UserSettingsIcon),
				},
			},
		],
	},
];

export default routes;
