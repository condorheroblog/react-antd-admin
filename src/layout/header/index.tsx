import type { GlobalToken } from "antd";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";

import BreadcrumbViews from "../breadcrumb-views";
import UserMenu from "./components/userMenu";
import LanguageMenu from "./components/languageMenu";
import ProjectSettings from "./components/projectSettings";

const { Header: AntdHeader } = Layout;

const useStyles = createUseStyles((theme: GlobalToken) => {
	return {
		layoutHeader: {
			display: "flex",
			justifyContent: "space-between",
		},
		layoutHeaderLeft: {
			display: "flex",
			alignItems: "center",
		},
		layoutHeaderRight: {
			"display": "flex",
			"justifyContent": "center",
			"marginRight": "0.5em",
			"alignItems": "center",
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
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}

export default function Header({ collapsed, setCollapsed }: HeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();

	return (
		<AntdHeader style={{ padding: 0, background: colorBgContainer, lineHeight: "48px", height: "48px" }}>
			<div className={classes.layoutHeader}>
				<div className={classes.layoutHeaderLeft}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							height: "100%",
						}}
					/>

					<BreadcrumbViews />
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
