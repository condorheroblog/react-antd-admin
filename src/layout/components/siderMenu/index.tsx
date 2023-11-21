import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useMatches } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { router } from "#src/router";
import type { AppRouteRecordRaw } from "#src/router/types";

type MenuItem = Required<MenuProps>["items"][number];

function getMenuItems(
	routeList: AppRouteRecordRaw[],
	t: (path: string) => string,
) {
	return routeList.map((item) => {
		const label = item?.meta?.title;
		const menuItem: MenuItem = {
			key: item.id!,
			icon: item?.meta?.icon,
			label: label ? t(label) : label,
		};
		if (Array.isArray(item.children) && item.children.length > 0) {
			const noIndexRoute = item.children.filter((route) => !route.index);
			if (noIndexRoute.length > 0) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				menuItem.children = getMenuItems(noIndexRoute, t);
			}
		}
		return menuItem;
	});
}

const getPathById = (
	menuItems: AppRouteRecordRaw[],
	id: string,
): string | null => {
	for (const menuItem of menuItems) {
		if (menuItem.id === id) {
			return menuItem.path!;
		}
		if (menuItem.children) {
			const path = getPathById(menuItem.children, id);
			if (path !== null) {
				return path;
			}
		}
	}
	return null;
};

function findChildrenLen(menuItems: AppRouteRecordRaw[], key: string) {
	const subRouteChildren: string[] = [];

	for (const { children, id } of menuItems) {
		if (children && children.length) {
			subRouteChildren.push(id as string);
		}
	}
	return subRouteChildren.includes(key);
}

export function SiderMenu() {
	const matches = useMatches();
	const navigate = useNavigate();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const routeList = (router.routes[0]?.children ?? []) as AppRouteRecordRaw[];
	const { t } = useTranslation();

	const getSelectedKeys = useMemo(
		() => matches.map((item) => item.id),
		[matches, routeList],
	);

	const handleSelect: MenuProps["onSelect"] = ({ key }) => {
		if (/http(s)?:/.test(key)) {
			window.open(key);
		} else {
			const routePath = getPathById(routeList, key);
			if (routePath) {
				navigate(routePath);
			}
		}
	};

	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		// eslint-disable-next-line unicorn/prefer-includes
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		const isExistChildren = latestOpenKey
			? findChildrenLen(routeList, latestOpenKey)
			: false;
		setOpenKeys(() => {
			if (isExistChildren) {
				if (latestOpenKey) {
					return [latestOpenKey];
				}
				return [];
			}
			return keys;
		});
	};

	useEffect(() => {
		setOpenKeys(matches.map((item) => item.id));
	}, [matches, routeList]);

	return (
		<Menu
			mode="inline"
			theme="dark"
			items={getMenuItems(routeList, t)}
			openKeys={openKeys}
			onOpenChange={handleOpenChange}
			selectedKeys={getSelectedKeys}
			onSelect={handleSelect}
		/>
	);
}
