import { Scrollbar } from "#src/components";
import { useDeviceType, usePreferences } from "#src/hooks";
import { cn } from "#src/utils";

import { theme as antdTheme, Drawer } from "antd";
import { createUseStyles } from "react-jss";

import LayoutMenu from "../layout-menu";
import { useMenu } from "../layout-menu/use-menu";

const useStyles = createUseStyles({
	drawerStyles: {
		"& .ant-drawer-body": {
			"padding": 0,
			"&>ul": {
				paddingTop: "1em",
			},
		},
		"& .ant-drawer-header": {
			display: "none",
		},
	},
});

export default function LayoutMobileMenu() {
	const classes = useStyles();
	const { token: { Menu } } = antdTheme.useToken();
	const { sidebarCollapsed, setPreferences, isDark, sidebarTheme } = usePreferences();
	const { isMobile } = useDeviceType();
	const { sideNavItems, handleMenuSelect } = useMenu();
	const isFixedDarkTheme = isDark || sidebarTheme === "dark";

	return (
		isMobile
			? (
				<Drawer
					styles={{
						body: {
							backgroundColor: isFixedDarkTheme ? Menu?.darkItemBg : Menu?.itemBg,
						},
					}}
					open={sidebarCollapsed}
					placement="left"
					width="clamp(200px, 50vw, 210px)"
					className={cn(classes.drawerStyles)}
					onClose={() => setPreferences("sidebarCollapsed", false)}
				>
					<Scrollbar>
						<LayoutMenu
							autoOpenMenu
							menus={sideNavItems}
							handleMenuSelect={handleMenuSelect}
						/>
					</Scrollbar>
				</Drawer>
			)
			: null
	);
}
