import type { MenuProps } from "antd";
import type { MenuItemType } from "./types";
import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { useGlobalStore, useUserStore } from "#src/store";

import { Menu } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMatches } from "react-router-dom";
import { findChildrenLen } from "./utils";

interface LayoutMenuProps {
	mode?: MenuProps["mode"]
	/**
	 * 是否自动展开菜单，用于解决水平菜单下子菜单展开自动关闭的问题
	 */
	autoOpenMenu?: boolean
	menus?: MenuItemType[]
	handleMenuSelect?: (key: string, mode: MenuProps["mode"]) => void
}

const emptyArray: MenuItemType[] = [];
export default function LayoutMenu({
	mode = "inline",
	autoOpenMenu,
	handleMenuSelect,
	menus = emptyArray,
}: LayoutMenuProps) {
	const matches = useMatches();
	const { sidebarCollapsed } = useContext(LayoutContext);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const lng = useUserStore(state => state.lng);
	const isMobile = useGlobalStore(state => state.isMobile);

	const getSelectedKeys = useMemo(
		() => matches.map(item => item.id),
		[matches],
	);

	const menuInlineCollapsedProp = useMemo(
		() => {
			/* inlineCollapsed 只在 inline 模式可用 */
			if (mode === "inline") {
				return { inlineCollapsed: isMobile ? false : sidebarCollapsed };
			}
			return {};
		},
		[mode, isMobile, sidebarCollapsed],
	);

	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		// eslint-disable-next-line unicorn/prefer-includes
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		const isExistChildren = latestOpenKey
			? findChildrenLen(menus, latestOpenKey)
			: false;
		setOpenKeys(() => {
			if (isExistChildren) {
				return latestOpenKey ? [latestOpenKey] : [];
			}
			return keys;
		});
	};

	const menuOpenProps = useMemo(
		() => {
			/* inlineCollapsed 只在 inline 模式可用 */
			if (autoOpenMenu) {
				return {
					openKeys,
					onOpenChange: handleOpenChange,
				};
			}
			return {};
		},
		[autoOpenMenu, openKeys],
	);

	useEffect(() => {
		/* 如果菜单是收起的，则不需要自动展开，防止子路由激活，菜单自动弹出 */
		if (!sidebarCollapsed) {
			setOpenKeys(matches.map(item => item.id));
		}
	}, [matches]);

	return (
		<Menu
			/**
			 * min-w-0 flex-auto 解决在 Flex 布局中，Menu 没有按照预期响应式省略菜单
			 * @see https://ant-design.antgroup.com/components/menu#why-menu-do-not-responsive-collapse-in-flex-layout
			 */
			className="!border-none min-w-0 flex-auto"
			inlineIndent={16}
			{...menuInlineCollapsedProp}
			// menuItem key is not changed when language changes
			key={lng}
			style={{ height: isMobile ? "100%" : "initial" }}
			mode={mode}
			// theme="dark"
			items={menus}
			{...menuOpenProps}
			selectedKeys={getSelectedKeys}
			onSelect={({ key }) => handleMenuSelect?.(key, mode)}
		/>
	);
}
