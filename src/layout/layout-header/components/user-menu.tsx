import type { MenuProps } from "antd";
import { $t } from "#src/locales";
import { useUserStore } from "#src/store";

import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
	{
		label: $t("common.logout"),
		key: "logout",
	},
];

export function UserMenu() {
	const navigate = useNavigate();
	const avatar = useUserStore(state => state.avatar);
	const logout = useUserStore(state => state.logout);

	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key === "logout") {
			await logout();
			navigate("/login");
		}
	};

	return (
		<Dropdown
			menu={{ items, onClick }}
			arrow={false}
			placement="bottom"
			trigger={["click"]}
		>
			<div role="menuitem" tabIndex={-1}>
				<Avatar src={avatar} />
			</div>
		</Dropdown>
	);
}
