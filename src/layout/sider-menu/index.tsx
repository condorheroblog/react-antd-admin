import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useMatches, Link } from "react-router-dom";

import { router } from "#src/router";
import type { AppRouteRecordRaw } from "#src/router/types";
import { useAppSelector } from "#src/store";

type MenuItem = Required<MenuProps>["items"][number];

function getMenuItems(routeList: AppRouteRecordRaw[]) {
	return routeList.reduce<MenuItem[]>((acc, item) => {
		const label = item?.handle?.title;
		const externalLink = item?.handle?.externalLink;
		const menuItem: MenuItem = {
			key: item.id!,
			icon: item?.handle?.icon,
			label: externalLink ? (
				<Link to={externalLink} target="_blank" rel="noopener noreferrer">
					{label}
				</Link>
			) : (
				label
			),
		};
		if (Array.isArray(item.children) && item.children.length > 0) {
			const noIndexRoute = item.children.filter((route) => !route.index);
			if (noIndexRoute.length > 0) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				menuItem.children = getMenuItems(noIndexRoute);
			}
		}
		if (item?.handle?.hideMenu) {
			return acc;
		}
		return [...acc, menuItem];
	}, []);
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

export default function SiderMenu() {
	const matches = useMatches();
	const navigate = useNavigate();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const lng = useAppSelector((state) => state.user.lng);
	const isMobile = useAppSelector((state) => state.global.isMobile);
	const routeList = (router.routes[0]?.children ?? []) as AppRouteRecordRaw[];

	const getSelectedKeys = useMemo(
		() => matches.map((item) => item.id),
		[matches, routeList],
	);

	const handleSelect: MenuProps["onSelect"] = ({ key }) => {
		if (/http(s)?:/.test(key)) {
			window.open(key);
		} else {
			const menuItem = getMenuById(routeList, key);
			if (menuItem && menuItem.path && !menuItem?.handle?.externalLink) {
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

	return (
		<Menu
			// menuItem key is not changed when language changes
			key={lng}
			style={{ height: isMobile ? "100%" : "initial" }}
			mode="inline"
			theme="dark"
			items={getMenuItems(routeList)}
			openKeys={openKeys}
			onOpenChange={handleOpenChange}
			selectedKeys={getSelectedKeys}
			onSelect={handleSelect}
		/>
	);
}
