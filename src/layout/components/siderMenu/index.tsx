import type { MenuProps } from "antd";
import { Menu } from "antd";
import { routeModuleList } from "#src/router";
import type { AppRouteRecordRaw } from "#src/router/types";

type MenuItem = Required<MenuProps>["items"][number];

function getMenuItems(routeList: AppRouteRecordRaw[]) {
	return routeList.map((item) => {
		const menuItem: MenuItem = {
			key: item.path!,
			icon: item?.meta?.icon,
			label: item?.meta?.title,
		};
		if (Array.isArray(item.children) && item.children.length > 0) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			menuItem.children = getMenuItems(item.children);
		}
		return menuItem;
	});
}

export function SiderMenu() {
	return routeModuleList ? (
		<Menu
			theme="dark"
			items={getMenuItems(routeModuleList)}
		/>
	) : null;
}
