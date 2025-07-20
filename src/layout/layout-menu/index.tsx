import type { MenuProps } from "antd";
import type { MenuItemType } from "./types";

import { useDeviceType, usePreferences } from "#src/hooks";
import { removeTrailingSlash } from "#src/router/utils";

import { useAccessStore } from "#src/store";
import { cn } from "#src/utils";

import { Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useMatches } from "react-router";

import { useStyles } from "./style";
import { getParentKeys } from "./utils";

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
	const classes = useStyles();
	const matches = useMatches();
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const { sidebarCollapsed, sidebarTheme, isDark, accordion } = usePreferences();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const { isMobile } = useDeviceType();

	const menuParentKeys = useMemo(() => {
		return getParentKeys(wholeMenus);
	}, [wholeMenus]);

	const getSelectedKeys = useMemo(
		() => {
			// First, try to find a route that specifies currentActiveMenu (highest priority)
			const currentActiveMatch = matches.findLast(routeItem =>
				routeItem.handle?.currentActiveMenu,
			);

			// If found, return the currentActiveMenu path with its parent keys
			if (currentActiveMatch?.handle?.currentActiveMenu) {
				const activeMenuPath = removeTrailingSlash(currentActiveMatch.handle.currentActiveMenu);
				const parentKeys = menuParentKeys[activeMenuPath] || [];
				return [...parentKeys, activeMenuPath];
			}

			// Fallback: Find the last visible route (not hidden in menu)
			const latestVisibleMatch = matches.findLast(routeItem =>
				routeItem.handle?.hideInMenu !== true,
			);

			// If found, return the route ID path with its parent keys
			if (latestVisibleMatch?.id) {
				const routePath = removeTrailingSlash(latestVisibleMatch.id);
				const parentKeys = menuParentKeys[routePath] || [];
				return [...parentKeys, routePath];
			}

			// Default return empty array if no matches found
			return [];
		},
		[matches, menuParentKeys],
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
		 * 1. 手风琴模式，点击菜单项，自动关闭其他菜单
		 * 2. 非手风琴模式且菜单是收起的，鼠标悬浮菜单自动关闭其他菜单
		 *
		 * 为什么不使用 antd menu 案例中的代码：
		 * @see https://ant.design/components/menu-cn#menu-demo-sider-current
		 * 原因：非手风琴模式下打开多个菜单，切换到手风琴模式下，点击菜单项，不会自动关闭其他菜单
		 */
		if (accordion || sidebarCollapsed) {
			// eslint-disable-next-line unicorn/prefer-includes
			const currentOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
			// open
			if (currentOpenKey !== undefined) {
				const parentKeys = menuParentKeys[currentOpenKey] || [];
				setOpenKeys([...parentKeys, currentOpenKey]);
			}
			else {
				// eslint-disable-next-line unicorn/prefer-includes
				const currentCloseKey = openKeys.find(key => keys.indexOf(key) === -1);
				// close
				if (currentCloseKey) {
					setOpenKeys(menuParentKeys[currentCloseKey]);
				}
			}
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

	/**
	 * 侧边菜单展开时，自动展开激活的菜单
	 * 侧边菜单收起时，自动关闭所有激活的菜单
	 * @see https://github.com/user-attachments/assets/df2d7b63-acf4-4faa-bea6-7616b7e69621
	 */
	useEffect(() => {
		// 折叠
		if (sidebarCollapsed) {
			setOpenKeys([]);
		}
		else {
			// 展开
			setOpenKeys(getSelectedKeys);
		}
	}, [matches, sidebarCollapsed, getSelectedKeys]);

	return (
		<Menu
			/**
			 * min-w-0 flex-auto 解决在 Flex 布局中，Menu 没有按照预期响应式省略菜单
			 * @see https://ant-design.antgroup.com/components/menu#why-menu-do-not-responsive-collapse-in-flex-layout
			 */
			className={cn(
				"!border-none min-w-0 flex-auto",
				{
					/**
					 * @zh 当侧边菜单折叠时，添加背景色
					 * @en When the side menu is collapsed, add background color
					 */
					[classes.menuBackgroundColor]: sidebarCollapsed,
				},
			)}
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
