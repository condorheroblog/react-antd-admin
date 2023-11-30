import { PaperClipOutlined, AntDesignOutlined } from "@ant-design/icons";
import { createElement } from "react";

import type { AppRouteRecordRaw } from "../types";
import { ReactIcon } from "../icon";

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
			title: t("global.menus.iframe"),
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
			{
				path: "/iframe/react-docs",
				id: "iframe_react_docs",
				Component: Iframe,
				handle: {
					icon: createElement(ReactIcon),
					title: "React Docs(Outbound Link)",
					externalLink: "https://react.dev/",
				},
			},
		],
	},
];

export default routes;
