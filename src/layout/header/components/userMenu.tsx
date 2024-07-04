import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";

import { useUserStore } from "#src/store";

const items: MenuProps["items"] = [
	{
		label: "退出登录",
		key: "logout",
	},
];

export default function UserMenu() {
	const avatar = useUserStore(state => state.avatar);
	const logout = useUserStore(state => state.logout);
	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key === "logout") {
			await logout();
		}
	};

	return (
		<Dropdown menu={{ items, onClick }} arrow placement="bottom">
			<div role="menuitem" tabIndex={-1}>
				<Avatar src={avatar} />
			</div>
		</Dropdown>
	);
}
