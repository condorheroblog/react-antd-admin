import { LoginOutlined } from "@ant-design/icons";
import { createElement } from "react";
import type { AppRouteRecordRaw } from "../types";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/login",
		id: "login",
		lazy: async () => {
			const mod = await import("#src/pages/login");
			return {
				...mod,
				Component: mod.default,
			};
		},
		meta: {
			icon: createElement(LoginOutlined),
			title: "登录",
			sort: 101,
		},
	},
];

export default routes;
