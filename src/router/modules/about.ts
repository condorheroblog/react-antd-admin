import { UserOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		id: "about",
		lazy: async () => {
			const mod = await import("#src/pages/about");
			return {
				...mod,
				Component: mod.default,
			};
		},
		meta: {
			title: "About",
			icon: createElement(UserOutlined),
		},
	},
];

export default routes;
