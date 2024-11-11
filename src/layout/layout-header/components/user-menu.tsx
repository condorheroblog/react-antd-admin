import type { MenuProps } from "antd";
import { UserCircleIcon } from "#src/icons";
import { $t } from "#src/locales";
import { useAuthStore, useUserStore } from "#src/store";
import { isWindowsOs } from "#src/utils";

import { LogoutOutlined } from "@ant-design/icons";
import { useKeyPress } from "ahooks";
import { Avatar, Dropdown } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
	const navigate = useNavigate();
	const avatar = useUserStore(state => state.avatar);
	const logout = useAuthStore(state => state.logout);

	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key === "logout") {
			await logout();
			navigate("/login");
		}
		if (key === "personal-center") {
			navigate("/personal-center/my-profile");
		}
	};

	const altView = useMemo(() => isWindowsOs() ? "Alt" : "⌥", [isWindowsOs]);
	const items: MenuProps["items"] = [
		{
			label: $t("common.menu.personalCenter"),
			key: "personal-center",
			icon: <UserCircleIcon />,
			extra: `${altView}P`,
		},
		{
			label: $t("authority.logout"),
			key: "logout",
			icon: <LogoutOutlined />,
			extra: `${altView}Q`,
		},
	];

	useKeyPress(["alt.P"], () => {
		navigate("/personal-center/my-profile");
	});

	useKeyPress(["alt.Q"], () => {
		onClick({ key: "logout" } as any);
	});

	return (
		<Dropdown
			menu={{ items, onClick }}
			arrow={false}
			placement="bottomRight"
			trigger={["click"]}
		>
			<div role="menuitem" tabIndex={-1}>
				<Avatar src={avatar} />
			</div>
		</Dropdown>
	);
}
