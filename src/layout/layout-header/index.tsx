import type { ButtonProps } from "antd";
import { useDeviceType, usePreferences } from "#src/hooks";
import { useLayout } from "#src/layout/hooks/use-layout";
import { GlobalSearch, Preferences } from "#src/layout/widgets";
import { NotificationContainer } from "#src/layout/widgets/notification/notification-container";
import { useTabsStore } from "#src/store";
import { cn } from "#src/utils";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { theme as antdTheme, Button, ConfigProvider, theme } from "antd";

import { headerHeight } from "../constants";
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
		token: { Menu },
	} = theme.useToken();
	const {
		sidebarCollapsed,
		setPreferences,
		isDark,
		sidebarTheme,
	} = usePreferences();
	const { isMobile } = useDeviceType();
	const isMaximize = useTabsStore(state => state.isMaximize);
	const { isTopNav, isMixedNav } = useLayout();
	const isFixedDarkTheme = isDark || (sidebarTheme === "dark" && (isMixedNav || isTopNav));

	return (
		<ConfigProvider
			theme={{
				algorithm: isFixedDarkTheme
					? antdTheme.darkAlgorithm
					: antdTheme.defaultAlgorithm,
			}}
		>
			<header
				className={cn(
					"flex-shrink-0 flex gap-5 justify-between items-center transition-all md:px-4",
					{ "overflow-hidden": isMaximize },
					className,
				)}
				style={{
					background: isFixedDarkTheme ? Menu?.darkItemBg : Menu?.itemBg,
					height: isMaximize ? 0 : headerHeight,
				}}
			>

				{
					isMobile
						? (
							<Button
								type="text"
								icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
								onClick={() => setPreferences("sidebarCollapsed", !sidebarCollapsed)}
								className="h-full"
							/>
						)
						: null
				}

				<div className="flex items-center flex-grow h-full overflow-hidden">
					{children}
				</div>

				<div className="flex items-center">
					<GlobalSearch />
					<Preferences {...buttonProps} />
					<ThemeButton {...buttonProps} />
					<LanguageButton {...buttonProps} />
					<FullscreenButton {...buttonProps} target={document.documentElement} />
					<NotificationContainer {...buttonProps} />
					<UserMenu {...buttonProps} />
				</div>
			</header>
		</ConfigProvider>
	);
}
