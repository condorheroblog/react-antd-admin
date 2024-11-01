import type { MenuProps } from "antd";
import type { MenuItemType } from "../layout-menu/types";
import { useCurrentRoute } from "#src/hooks";
import { removeTrailingSlash } from "#src/router/utils";
import { usePermissionStore } from "#src/store";

import { theme } from "antd";
import { clsx } from "clsx";
import { useCallback } from "react";

import { createUseStyles } from "react-jss";
import { findRootMenuByPath } from "../layout-menu/utils";
import { Logo } from "../widgets";

const useStyles = createUseStyles(({ token }) => {
	return {
		menuItem: {
			"color": token.colorTextBase,
			"&:hover": {
				backgroundColor: "rgba(0, 0, 0, 0.06)",
			},
			"&:active": {
				backgroundColor: token.colorPrimaryActive,
			},
		},
	};
});

interface FirstColumnMenuProps {
	menus?: MenuItemType[]
	handleMenuSelect?: (key: string, mode: MenuProps["mode"]) => void
}

const emptyArray: MenuItemType[] = [];
export default function FirstColumnMenu({
	handleMenuSelect,
	menus = emptyArray,
}: FirstColumnMenuProps) {
	const classes = useStyles();
	const { token } = theme.useToken();
	const { pathname } = useCurrentRoute();
	const wholeMenus = usePermissionStore(state => state.wholeMenus);

	const getMenuItemStyles = useCallback((menuItemKey: string) => {
		const { rootMenuPath } = findRootMenuByPath(wholeMenus, removeTrailingSlash(pathname));
		if (!rootMenuPath)
			return {};
		const isMatched = menuItemKey === rootMenuPath;
		if (isMatched) {
			return {
				color: token.colorWhite,
				backgroundColor: token.colorPrimaryActive,
			};
		}
		return {};
	}, [pathname]);

	return (
		<div className="border-r h-full">
			<Logo sidebarCollapsed />
			<menu className="list-none pl-0 pt-2 m-0">
				{
					menus.map((menu) => {
						return (
							<li
								key={menu.key}
								onPointerDown={() => handleMenuSelect?.(menu.key, "horizontal")}
								style={getMenuItemStyles(menu.key)}
								className={clsx(
									"group my-1 mx-2 flex flex-col items-center gap-0.5 cursor-pointer p-2 rounded-md",
									classes.menuItem,
								)}
							>
								<span className="text-center text-xl transition duration-300 group-hover:scale-125">{menu.icon}</span>
								<span className="text-center text-xs">{menu.label}</span>
							</li>
						);
					})
				}
			</menu>
		</div>
	);
}
