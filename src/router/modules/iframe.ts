import { PaperClipOutlined, AntDesignOutlined } from "@ant-design/icons";
import { createElement } from "react";

import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";
import { Iframe } from "#src/components/iframe";
import { t } from "#src/locales";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/iframe",
		id: "iframe",
		Component: ContainerLayout,
		handle: {
			icon: createElement(PaperClipOutlined),
			title: t("menus.iframe"),
			sort: 99,
		},
		children: [
			{
				path: "/iframe/ant-design",
				id: "iframe_index",
				Component: Iframe,
				handle: {
					icon: createElement(AntDesignOutlined),
					title: "Ant Design(Inbound Link)",
					iframeLink: "https://ant.design/",
				},
			},
		],
	},
];

export default routes;
