import type { GetProps } from "antd";
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

export function MailCheckIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={MailCheck} {...props} />;
}

export function MixedNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={MixedNavigation} {...props} />;
}

export function ProfileIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={ProfileCard} {...props} />;
}

export function SideNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={SideNavigation} {...props} />;
}

export function TopNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={TopNavigation} {...props} />;
}

export function TwoColumnNavigationIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={TwoColumnNavigation} {...props} />;
}

export function UserCircleIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={UserCircle} {...props} />;
}

export function UserSettingsIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={UserSettings} {...props} />;
}
