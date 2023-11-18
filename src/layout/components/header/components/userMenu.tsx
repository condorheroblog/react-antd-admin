import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";

import { useAppSelector, useAppDispatch } from "#src/store";
import { authLogoutThunk } from "#src/store/slices/user";

const items: MenuProps["items"] = [
	{
		label: "退出登录",
		key: "logout",
	},
];

export default function UserMenu() {
	const dispatch = useAppDispatch();
	const { avatar, username } = useAppSelector(
		(state) => state.user,
	);
	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key === "logout") {
			await dispatch(authLogoutThunk());
		}
	};

	return (
		<Dropdown menu={{ items, onClick }} placement="bottom">
			<Space style={{ cursor: "pointer" }}>
				<Avatar src={avatar} />
				{username}
			</Space>
		</Dropdown>
	);
}
