import type { MenuProps } from "antd";
import type { MenuItemType } from "../layout-menu/types";
import { Scrollbar } from "#src/components";
import { useCurrentRoute, usePreferences } from "#src/hooks";
import { removeTrailingSlash } from "#src/router/utils";
import { usePermissionStore } from "#src/store";

import { ConfigProvider, Menu } from "antd";
import { clsx } from "clsx";
import { createUseStyles } from "react-jss";

import { headerHeight } from "../constants";
import { findRootMenuByPath } from "../layout-menu/utils";
import { Logo } from "../widgets";

const useStyles = createUseStyles(({ token }) => {
	return {
		menu: {
			"& .ant-menu-item": {
				"gap": token.sizeXS,
				"height": "60px",
				"display": "flex",
				"flexDirection": "column",
				"alignItems": "center",
				"justifyContent": "center",
				"& .ant-menu-title-content": {
					lineHeight: "initial",
					margin: "0px !important",
					fontSize: token.fontSizeIcon,
				},
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
	const { pathname } = useCurrentRoute();
	const wholeMenus = usePermissionStore(state => state.wholeMenus);
	const { firstColumnWidthInTwoColumnNavigation, isDark, sidebarTheme } = usePreferences();

	const { rootMenuPath } = findRootMenuByPath(wholeMenus, removeTrailingSlash(pathname));

	return (

		<div
			style={{
				width: firstColumnWidthInTwoColumnNavigation,
			}}
			className={clsx("border-r h-full", sidebarTheme === "dark" ? "border-r-[#303030]" : "border-r-colorBorderSecondary")}
		>
			<Logo sidebarCollapsed />
			<Scrollbar style={{ height: `calc(100% - ${headerHeight}px)` }}>
				<ConfigProvider theme={{
					components: {
						Menu: {
							collapsedWidth: firstColumnWidthInTwoColumnNavigation - 1,
						},
					},
				}}
				>
					<Menu
						mode="vertical"
						// inlineCollapsed
						selectedKeys={[rootMenuPath ?? ""]}
						className={clsx(classes.menu)}
						items={menus}
						theme={isDark ? "dark" : sidebarTheme}
						onSelect={({ key }) => handleMenuSelect?.(key, "horizontal")}
					/>
				</ConfigProvider>
			</Scrollbar>
		</div>
	);
}
