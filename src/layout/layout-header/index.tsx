import { useDeviceType } from "#src/hooks";
import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { NotificationContainer } from "#src/layout/widgets/notification/notification-container";
import { Preferences } from "#src/layout/widgets/preferences";
import { useTabsStore } from "#src/store";
import { cn } from "#src/utils";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { useContext } from "react";
import { createUseStyles } from "react-jss";

import { FullscreenButton } from "./components/fullscreen-button";
import { LanguageButton } from "./components/language-button";
import { ThemeButton } from "./components/theme-button";
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
	const { isMobile } = useDeviceType();
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

			<div className="flex items-center flex-grow h-full overflow-hidden">
				{children}
			</div>

			<div
				role="menu"
				tabIndex={0}
				className={classes.layoutHeaderRight}
			>
				<Preferences />
				<ThemeButton />
				<LanguageButton />
				<FullscreenButton target={document.documentElement} />
				<NotificationContainer />
				<UserMenu />
			</div>
		</header>
	);
}
