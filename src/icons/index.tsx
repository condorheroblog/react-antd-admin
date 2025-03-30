import type { GetProps } from "antd";
import { cn } from "#src/utils";

import Icon from "@ant-design/icons";

import Embedded from "./svg/embedded.svg?react";
import External from "./svg/external.svg?react";
import FollowSystem from "./svg/follow-system.svg?react";
import FullscreenExit from "./svg/fullscreen-exit.svg?react";
import Fullscreen from "./svg/fullscreen.svg?react";
import LayoutCenter from "./svg/layout-center.svg?react";
import LayoutLeft from "./svg/layout-left.svg?react";
import LayoutRight from "./svg/layout-right.svg?react";
import MailCheck from "./svg/mail-check.svg?react";
import MixedNavigation from "./svg/mixed-navigation.svg?react";
import Moon from "./svg/moon.svg?react";
import OutsidePage from "./svg/outside-page.svg?react";
import ProfileCard from "./svg/profile-card.svg?react";
import ReactLogo from "./svg/react-logo.svg?react";
import ServerError from "./svg/server-error.svg?react";
import SideNavigation from "./svg/side-navigation.svg?react";
import Sun from "./svg/sun.svg?react";
import TopNavigation from "./svg/top-navigation.svg?react";
import TwoColumnNavigation from "./svg/two-column-navigation.svg?react";
import UserCircle from "./svg/user-circle.svg?react";
import UserSettings from "./svg/user-settings.svg?react";

type CustomIconComponentProps = GetProps<typeof Icon>;

/* ========================== Start ========================== */
// Icon 组件会覆盖 SVG 的宽高为 1em，以下几个 SVG 比较特殊，SVG 的纵横比为 0.63:1 ，需要手动设置高度为 0.63em
export function MixedNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={MixedNavigation} {...props} className={cn("[&>svg]:h-[0.63em]", props.className)} />;
}

export function SideNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={SideNavigation} {...props} className={cn("[&>svg]:h-[0.63em]", props.className)} />;
}

export function TopNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={TopNavigation} {...props} className={cn("[&>svg]:h-[0.63em]", props.className)} />;
}

export function TwoColumnNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={TwoColumnNavigation} {...props} className={cn("[&>svg]:h-[0.63em]", props.className)} />;
}

/* ========================== End ========================== */

export function MailCheckIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={({ ...rest }) => <MailCheck {...rest} fill="none" />} {...props} />;
}

export function ProfileIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={ProfileCard} {...props} />;
}

export function UserCircleIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={UserCircle} {...props} />;
}

export function UserSettingsIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={UserSettings} {...props} />;
}

export function MoonIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={Moon} {...props} />;
}

export function SunIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={Sun} {...props} />;
}

export function FollowSystemIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={FollowSystem} {...props} />;
}

export function ReactLogoIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={({ ...rest }) => <ReactLogo {...rest} fill="none" />} {...props} />;
}

export function FullscreenIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={Fullscreen} {...props} />;
}

export function FullscreenExitIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={FullscreenExit} {...props} />;
}

export function ServerErrorIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={ServerError} {...props} />;
}

/* Outside Page */
export function OutsidePageIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={OutsidePage} {...props} />;
}

export function EmbeddedIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={Embedded} {...props} />;
}

export function ExternalIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={External} {...props} />;
}

export function LayoutLeftIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={LayoutLeft} {...props} />;
}

export function LayoutCenterIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={LayoutCenter} {...props} />;
}

export function LayoutRightIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={LayoutRight} {...props} />;
}
