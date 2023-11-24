import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";

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
	const { avatar } = useAppSelector((state) => state.user);
	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key === "logout") {
			await dispatch(authLogoutThunk());
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
