import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { NotificationContainer } from "#src/layout/widgets/notification/notification-container";
import { Preferences } from "#src/layout/widgets/preferences";
import { useGlobalStore, useTabsStore } from "#src/store";
import { cn } from "#src/utils";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { useContext } from "react";

import { createUseStyles } from "react-jss";
import { FullscreenMenu } from "./components/fullscreen-menu";
import { LanguageMenu } from "./components/language-menu";
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

export interface LayoutHeaderProps {
	className?: string
	children?: React.ReactNode
}

export default function LayoutHeader({ className, children }: LayoutHeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();
	const { sidebarCollapsed, setSidebarCollapsed } = useContext(LayoutContext);
	const isMobile = useGlobalStore(state => state.isMobile);
	const isMaximize = useTabsStore(state => state.isMaximize);

	return (
		<header
			className={cn(className, "h-12 flex-shrink-0 flex gap-5 justify-between items-center transition-all md:px-4", { "h-0 overflow-hidden": isMaximize })}
			style={{ background: colorBgContainer }}
		>

			{
				isMobile
					? (
						<Button
							type="text"
							icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
							className="h-full"
						/>
					)
					: null
			}

			<div className="h-full flex-grow overflow-hidden flex items-center">
				{children}
			</div>

			<div
				role="menu"
				tabIndex={0}
				className={classes.layoutHeaderRight}
			>
				<Preferences />
				<LanguageMenu />
				<FullscreenMenu target={document.documentElement} />
				<NotificationContainer />
				<UserMenu />
			</div>
		</header>
	);
}
