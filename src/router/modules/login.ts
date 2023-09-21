import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
	{
		lazy: async () => {
			const mod = await import("#src/pages/login");
			return {
				...mod,
				Component: mod.default,
			};
		},
		path: "/login",
	},
];

export default routes;
