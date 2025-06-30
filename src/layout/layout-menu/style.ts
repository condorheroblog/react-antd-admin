import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(() => {
	return {
		menuBackgroundColor: {
			"& .ant-menu-submenu-selected .ant-menu-submenu-title": {
				backgroundColor: "var(--ant-menu-item-selected-bg)",
			},
		},
	};
});
