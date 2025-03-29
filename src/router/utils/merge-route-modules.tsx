import type { AppRouteRecordRaw, RouteFileModule } from "#src/router/types";
import { addRouteIdByPath } from "./add-route-id-by-path";

export function mergeRouteModules(...routes: RouteFileModule[]) {
	return routes.flatMap((modules) => {
		return Object.keys(modules).reduce<AppRouteRecordRaw[]>(
			(list, key) => {
				const mod = modules[key].default ?? {};
				const modList = Array.isArray(mod) ? [...mod] : [mod];
				return [...list, ...addRouteIdByPath(modList)];
			},
			[],
		);
	});
}
