import { Layout, Button, theme, Row, Col, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import UserMenu from "./components/userMenu";
import LanguageMenu from "./components/languageMenu";

const { Header: AntdHeader } = Layout;

const headerMenuItems = [
	{
		label: <LanguageMenu />,
		key: "LanguageMenu",
		// icon: <LanguageMenu />,
	},
	{
		label: <UserMenu />,
		key: "UserMenu",
		// icon: <UserMenu />,
	},
];

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

				<Col span={6}>
					<Menu
						mode="horizontal"
						items={headerMenuItems}
						style={{ justifyContent: "flex-end" }}
						inlineIndent={20}
					/>
				</Col>
			</Row>
		</AntdHeader>
	);
}
