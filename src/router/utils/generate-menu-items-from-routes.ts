import type { MenuItemType } from "#src/layout/layout-menu/types";
import type { AppRouteRecordRaw } from "#src/router/types";

import * as basicIcons from "#src/icons";
import { isString } from "#src/utils";

import * as antdIcons from "@ant-design/icons";
import { createElement } from "react";
import { Link } from "react-router";

const allAntdIcons: { [key: string]: any } = antdIcons;
const allBasicIcons: { [key: string]: any } = basicIcons;

/**
 * 根据路由列表生成菜单项数组
 *
 * @param routeList 路由列表，类型为 AppRouteRecordRaw 数组
 * @returns 返回菜单项数组，数组元素类型为 MenuItemType
 */
export function generateMenuItemsFromRoutes(routeList: AppRouteRecordRaw[]) {
	return routeList.reduce<MenuItemType[]>((acc, item) => {
		const label = item.handle?.title;
		const externalLink = item?.handle?.externalLink;
		const iconName = item?.handle?.icon;

		const menuItem: MenuItemType = {
			key: item.path!,
			label: externalLink
				? createElement(
					Link,
					{
						// 阻止事件冒泡，防止触发菜单的点击事件
						onClick: (e) => {
							e.stopPropagation();
						},
						to: externalLink,
						target: "_blank",
						rel: "noopener noreferrer",
					},
					label,
				)
				: (
					label
				),
		};
		if (iconName) {
			menuItem.icon = iconName;
			if (isString(iconName)) {
				if (allAntdIcons[iconName]) {
					menuItem.icon = createElement(allAntdIcons[iconName]);
				}
				else if (allBasicIcons[iconName]) {
					menuItem.icon = createElement(allBasicIcons[iconName]);
				}
				else {
					console.warn(
						`iconName: ${iconName} is not found in allAntdIcons or allBasicIcons`,
					);
				}
			}
		}
		if (Array.isArray(item.children) && item.children.length > 0) {
			// 过滤掉非首页，且不显示在菜单中的路由
			const noIndexRoute = item.children.filter(route => !route.index && !route?.handle?.hideInMenu);
			if (noIndexRoute.length > 0) {
				menuItem.children = generateMenuItemsFromRoutes(noIndexRoute);
			}
		}
		if (item?.handle?.hideInMenu) {
			return acc;
		}
		return [...acc, menuItem];
	}, []);
}
