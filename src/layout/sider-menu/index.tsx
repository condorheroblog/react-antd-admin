import type { MenuProps } from "antd";
import type { ItemType } from "antd/es/menu/interface";

import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { useGlobalStore, usePermissionStore, useUserStore } from "#src/store";
import { Menu } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMatches, useNavigate } from "react-router-dom";

export function findChildrenLen(menuItems: ItemType[], targetKey: string) {
	const subRouteChildren: string[] = [];

	// @ts-expect-error Pls help me to fix this error
	for (const { children, key } of menuItems) {
		if (Array.isArray(children) && children.length) {
			subRouteChildren.push(key);
		}
	}
	return subRouteChildren.includes(targetKey);
}

export default function SiderMenu() {
	const matches = useMatches();
	const navigate = useNavigate();
	const { collapsed } = useContext(LayoutContext);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const lng = useUserStore(state => state.lng);
	const isMobile = useGlobalStore(state => state.isMobile);
	const wholeMenus = usePermissionStore(state => state.wholeMenus);

	const getSelectedKeys = useMemo(
		() => matches.map(item => item.id),
		[matches],
	);

	const handleSelect: MenuProps["onSelect"] = ({ key }) => {
		// eslint-disable-next-line regexp/no-unused-capturing-group
		if (/http(s)?:/.test(key)) {
			window.open(key);
		}
		else {
			navigate(key);
		}
	};

	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		// eslint-disable-next-line unicorn/prefer-includes
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		const isExistChildren = latestOpenKey
			? findChildrenLen(wholeMenus, latestOpenKey)
			: false;
		setOpenKeys(() => {
			if (isExistChildren) {
				return latestOpenKey ? [latestOpenKey] : [];
			}
			return keys;
		});
	};

	useEffect(() => {
		/* 如果菜单是收起的，则不需要自动展开，防止子路由激活，菜单自动弹出 */
		if (!collapsed) {
			setOpenKeys(matches.map(item => item.id));
		}
	}, [matches]);

	return (
		<Menu
			className="!border-none"
			inlineIndent={16}
			inlineCollapsed={isMobile ? false : collapsed}
			// menuItem key is not changed when language changes
			key={lng}
			style={{ height: isMobile ? "100%" : "initial" }}
			mode="inline"
			// theme="dark"
			items={wholeMenus}
			openKeys={openKeys}
			onOpenChange={handleOpenChange}
			selectedKeys={getSelectedKeys}
			onSelect={handleSelect}
		/>
	);
}
