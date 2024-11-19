import type { AppRouteRecordRaw } from "../types";
import { Iframe } from "#src/components/iframe";

import { ReactLogoIcon } from "#src/icons";
import { ContainerLayout } from "#src/layout";

import { $t } from "#src/locales";
import { iframe } from "#src/router/extra-info";
import { AntDesignOutlined, PaperClipOutlined } from "@ant-design/icons";
import { createElement } from "react";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/iframe",
		Component: ContainerLayout,
		handle: {
			icon: createElement(PaperClipOutlined),
			title: $t("common.menu.iframe"),
			order: iframe,
		},
		children: [
			{
				path: "/iframe/ant-design",
				Component: Iframe,
				handle: {
					icon: createElement(AntDesignOutlined),
					title: "Ant Design(Inbound Link)",
					iframeLink: "https://ant.design/",
				},
			},
			{
				path: "/iframe/react-docs",
				Component: Iframe,
				handle: {
					icon: createElement(ReactLogoIcon),
					title: "React Docs(Outbound Link)",
					externalLink: "https://react.dev/",
				},
			},
		],
	},
];

export default routes;
