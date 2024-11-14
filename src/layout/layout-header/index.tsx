import type { ButtonProps } from "antd";
import { useDeviceType } from "#src/hooks";
import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { NotificationContainer } from "#src/layout/widgets/notification/notification-container";
import { Preferences } from "#src/layout/widgets/preferences";
import { useTabsStore } from "#src/store";
import { cn } from "#src/utils";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { useContext } from "react";

import { FullscreenButton } from "./components/fullscreen-button";
import { LanguageButton } from "./components/language-button";
import { ThemeButton } from "./components/theme-button";
import { UserMenu } from "./components/user-menu";

export interface LayoutHeaderProps {
	className?: string
	children?: React.ReactNode
}

const buttonProps: ButtonProps = {
	size: "large",
	className: "px-[11px]",
};

export default function LayoutHeader({ className, children }: LayoutHeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
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

			<div className="flex items-center">
				<Preferences {...buttonProps} />
				<ThemeButton {...buttonProps} />
				<LanguageButton {...buttonProps} />
				<FullscreenButton {...buttonProps} target={document.documentElement} />
				<NotificationContainer {...buttonProps} />
				<UserMenu {...buttonProps} />
			</div>
		</header>
	);
}
