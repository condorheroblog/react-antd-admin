import { Layout, Button, theme } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";

const {
	Header: AntdHeader,
} = Layout;

export interface HeaderProps {
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
}

export function Header({ collapsed, setCollapsed }: HeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<AntdHeader style={{ padding: 0, background: colorBgContainer }}>
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{
					fontSize: "16px",
					width: 64,
					height: 64,
				}}
			/>
		</AntdHeader>

	);
}
