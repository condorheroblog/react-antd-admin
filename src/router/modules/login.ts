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
			title: "登录",
		},
	},
];

export default routes;
