import type { MenuProps } from "antd";
import type { MenuItemType } from "./types";

import { useDeviceType, usePreferences } from "#src/hooks";

import { Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useMatches } from "react-router";

import { findChildrenLen } from "./utils";

interface LayoutMenuProps {
	mode?: MenuProps["mode"]
	/**
	 * 控制是否自动展开当前路由对应的菜单项
	 *
	 * Why?
	 * 注意：当菜单模式为顶部导航模式，菜单 mode 为 horizontal，初次进入页面时，菜单不应自动展开，可以指定 autoExpandCurrentMenu 为 false 关闭自动展开功能
	 * @see https://github.com/user-attachments/assets/705ae01d-db7f-4f42-b4dd-66adba0dd68f
	 */
	autoExpandCurrentMenu?: boolean
	menus?: MenuItemType[]
	handleMenuSelect?: (key: string, mode: MenuProps["mode"]) => void
}

const emptyArray: MenuItemType[] = [];
export default function LayoutMenu({
	mode = "inline",
	autoExpandCurrentMenu,
	handleMenuSelect,
	menus = emptyArray,
}: LayoutMenuProps) {
	const matches = useMatches();
	const { sidebarCollapsed, sidebarTheme, isDark, accordion } = usePreferences();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const { isMobile } = useDeviceType();

	const getSelectedKeys = useMemo(
		() => matches.map(item => item.id),
		[matches],
	);

	const menuInlineCollapsedProp = useMemo(() => {
		/* inlineCollapsed 只在 inline 模式可用 */
		if (mode === "inline") {
			return { inlineCollapsed: isMobile ? false : sidebarCollapsed };
		}
		return {};
	}, [mode, isMobile, sidebarCollapsed]);

	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		/**
		 * 1. 手风琴模式，点开菜单自动关闭其他菜单
		 * 2. 非手风琴模式且菜单是收起的，悬浮菜单自动关闭其他菜单
		 */
		if (accordion || sidebarCollapsed) {
			// eslint-disable-next-line unicorn/prefer-includes
			const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
			// 检查新打开的菜单是否有子菜单
			const shouldKeepOpen = latestOpenKey
				? Boolean(findChildrenLen(menus, latestOpenKey))
				: false;

			setOpenKeys(shouldKeepOpen ? [latestOpenKey!] : []);
		}
		else {
			setOpenKeys(keys);
		}
	};

	const menuOpenProps = useMemo(() => {
		// 如果开启了手风琴模式，则需要自动展开菜单
		if (autoExpandCurrentMenu) {
			return {
				openKeys,
				onOpenChange: handleOpenChange,
			};
		}
		return {};
	}, [autoExpandCurrentMenu, openKeys, handleOpenChange]);

	useEffect(() => {
		/**
		 * 如果菜单是收起的，则不需要自动展开，防止子路由激活，菜单自动弹出
		 * @see https://github.com/user-attachments/assets/df2d7b63-acf4-4faa-bea6-7616b7e69621
		 */
		if (!sidebarCollapsed) {
			setOpenKeys((prevOpenKeys) => {
				// 如果不是手风琴模式（不需要自动关闭其他菜单），只有初次进入页面时，才需要自动展开菜单
				if (!accordion && prevOpenKeys.length !== 0) {
					return prevOpenKeys;
				}
				return matches.map(item => item.id);
			});
		}
	}, [matches, sidebarCollapsed]);

	return (
		<Menu
			/**
			 * min-w-0 flex-auto 解决在 Flex 布局中，Menu 没有按照预期响应式省略菜单
			 * @see https://ant-design.antgroup.com/components/menu#why-menu-do-not-responsive-collapse-in-flex-layout
			 */
			className="!border-none min-w-0 flex-auto"
			inlineIndent={16}
			{...menuInlineCollapsedProp}
			style={{ height: isMobile ? "100%" : "initial" }}
			mode={mode}
			theme={isDark ? "dark" : sidebarTheme}
			items={menus}
			{...menuOpenProps}
			selectedKeys={getSelectedKeys}
			/**
			 * 使用 onClick 替代 onSelect 事件，原因是当子路由激活父菜单时，点击父菜单依然可以正常导航。
			 * @see https://github.com/user-attachments/assets/cf67a973-f210-45e4-8278-08727ab1b8ce
			 */
			onClick={({ key }) => handleMenuSelect?.(key, mode)}
		/>
	);
}
