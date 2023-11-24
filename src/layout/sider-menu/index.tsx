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

const getMenuById = (
	menuItems: AppRouteRecordRaw[],
	id: string,
): AppRouteRecordRaw | null => {
	for (const menuItem of menuItems) {
		if (menuItem.id === id) {
			return menuItem;
		}
		if (menuItem.children) {
			const findItem = getMenuById(menuItem.children, id);
			if (findItem) {
				return findItem;
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
			const menuItem = getMenuById(routeList, key);
			if (menuItem && menuItem.path) {
				navigate(menuItem.path);
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

	useEffect(() => {
		const currentOpenKey = matches[matches.length - 1].id;
		const menuItem = getMenuById(routeList, currentOpenKey);
		if (menuItem && menuItem.meta?.title) {
			document.title = t(menuItem.meta?.title);
		}
	}, [matches, routeList]);

	return (
		<Menu
			style={{ height: "100%" }}
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
