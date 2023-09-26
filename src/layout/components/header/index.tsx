import {
	Layout, Button, theme, Row, Col, Space,
} from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import UserMenu from "./components/userMenu";

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
			<Row justify="space-between">
				<Col>
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

				</Col>
				<Col pull={1}>
					<Space>
						<UserMenu />
					</Space>
				</Col>
			</Row>
		</AntdHeader>

	);
}
