import type { GlobalToken } from "antd";
import { Layout, Button, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";

import UserMenu from "./components/userMenu";
import LanguageMenu from "./components/languageMenu";
import ProjectSettings from "./components/projectSettings";

const { Header: AntdHeader } = Layout;

const useStyles = createUseStyles((theme: GlobalToken) => {
	return {
		layoutHeader: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "stretch",
		},
		layoutHeaderLeft: {},
		layoutHeaderRight: {
			display: "flex",
			justifyContent: "center",
			marginRight: "1.8em",
			alignItems: "center",
			"&>div": {
				cursor: "pointer",
				padding: ["0", ".7em"],
			},
			"&>div:hover": {
				background: {
					color: theme.colorBgTextHover,
				},
			},
		},
	};
});

export interface HeaderProps {
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
}

export default function Header({ collapsed, setCollapsed }: HeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();

	return (
		<AntdHeader style={{ padding: 0, background: colorBgContainer }}>
			<div className={classes.layoutHeader}>
				<div className={classes.layoutHeaderLeft}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
				</div>

				<div className={classes.layoutHeaderRight} role="menu" tabIndex={0}>
					<LanguageMenu />
					<UserMenu />
					<ProjectSettings />
				</div>
			</div>
		</AntdHeader>
	);
}
