import type { GetProps } from "antd";
import { cn } from "#src/utils";

import Icon from "@ant-design/icons";

import MailCheck from "./mail-check.svg?react";
import MixedNavigation from "./mixed-navigation.svg?react";
import ProfileCard from "./profile-card.svg?react";
import SideNavigation from "./side-navigation.svg?react";
import TopNavigation from "./top-navigation.svg?react";
import TwoColumnNavigation from "./two-column-navigation.svg?react";
import UserCircle from "./user-circle.svg?react";
import UserSettings from "./user-settings.svg?react";

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
	return <Icon component={MailCheck} {...props} />;
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
