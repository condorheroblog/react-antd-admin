import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	menuBackgroundColor: {
		"& .ant-menu-submenu-selected .ant-menu-submenu-title": {
			backgroundColor: "var(--ant-menu-item-selected-bg)",
		},
	},
});
