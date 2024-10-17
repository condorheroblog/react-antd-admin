import { useGlobalStore } from "#src/store";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { clsx } from "clsx";

import { createUseStyles } from "react-jss";
import BreadcrumbViews from "../breadcrumb-views";
import { FullscreenMenu } from "./components/fullscreen-menu";
import { LanguageMenu } from "./components/language-menu";
import { ProjectSettings } from "./components/project-settings";
import { UserMenu } from "./components/user-menu";

const { Header: AntdHeader } = Layout;

const useStyles = createUseStyles(({ token }) => {
	return {
		layoutHeader: {
			display: "flex",
			justifyContent: "space-between",
			marginLeft: "1em",
		},
		layoutHeaderLeft: {
			display: "flex",
			alignItems: "center",
		},
		layoutHeaderRight: {
			"display": "flex",
			"justifyContent": "center",
			"alignItems": "center",
			"&>div": {
				cursor: "pointer",
				padding: ["0", ".7em"],
			},
			"&>div:hover": {
				background: {
					color: token.colorBgTextHover,
				},
			},
		},
	};
});

export interface HeaderProps {
	className?: string
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}

export default function Header({ className, collapsed, setCollapsed }: HeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();
	const isMobile = useGlobalStore(state => state.isMobile);

	return (
		<AntdHeader
			className={clsx(className, "p-0")}
			style={{ background: colorBgContainer, height: 48, lineHeight: "48px" }}
		>
			<div className={classes.layoutHeader}>
				<div className={classes.layoutHeaderLeft}>
					{
						isMobile
							? (
								<Button
									type="text"
									icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
									onClick={() => setCollapsed(!collapsed)}
									style={{
										fontSize: "16px",
										height: "100%",
									}}
								/>
							)
							: null
					}

					<BreadcrumbViews />
				</div>

				<div className={classes.layoutHeaderRight} role="menu" tabIndex={0}>
					<LanguageMenu />
					<FullscreenMenu target={document.documentElement} />
					<UserMenu />
					<ProjectSettings />
				</div>
			</div>
		</AntdHeader>
	);
}
