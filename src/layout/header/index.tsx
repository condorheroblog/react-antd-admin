import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { useGlobalStore, useTabsStore } from "#src/store";
import { cn } from "#src/utils";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { useContext } from "react";
import { createUseStyles } from "react-jss";

import BreadcrumbViews from "../breadcrumb-views";
import { FullscreenMenu } from "./components/fullscreen-menu";
import { LanguageMenu } from "./components/language-menu";
import { ProjectSettings } from "./components/project-settings";
import { UserMenu } from "./components/user-menu";

const useStyles = createUseStyles(({ token }) => {
	return {
		layoutHeaderRight: {
			"display": "flex",
			"justifyContent": "center",
			"alignItems": "center",
			"height": "100%",
			"&>*": {
				height: "100%",
				cursor: "pointer",
				padding: ["0", ".7em"],
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
			"&>*:hover": {
				background: {
					color: token.colorBgTextHover,
				},
			},
		},
	};
});

export interface HeaderProps {
	className?: string
}

export default function Header({ className }: HeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();
	const { collapsed, setCollapsed } = useContext(LayoutContext);
	const isMobile = useGlobalStore(state => state.isMobile);
	const isMaximize = useTabsStore(state => state.isMaximize);

	return (
		<header
			className={cn(className, "h-12 flex-shrink-0 flex justify-between items-center transition-all md:px-4", { "h-0 overflow-hidden": isMaximize })}
			style={{ background: colorBgContainer }}
		>

			{
				isMobile
					? (
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							className="h-full"
						/>
					)
					: null
			}

			<BreadcrumbViews />

			<div
				role="menu"
				tabIndex={0}
				className={classes.layoutHeaderRight}
			>
				<LanguageMenu />
				<FullscreenMenu target={document.documentElement} />
				<UserMenu />
				<ProjectSettings />
			</div>
		</header>
	);
}
