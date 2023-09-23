import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
	Layout, Menu, theme,
} from "antd";
import { createElement, useState } from "react";
import { Logo } from "./components/logo";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const { Content, Sider } = Layout;

const items: MenuProps["items"] = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	BarChartOutlined,
	CloudOutlined,
	AppstoreOutlined,
	TeamOutlined,
	ShopOutlined,
].map((icon, index) => ({
	key: String(index + 1),
	icon: createElement(icon),
	label: `nav ${index + 1}`,
}));

export function ContainerLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ height: "100%" }}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<Logo collapsed={collapsed} />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
			</Sider>
			<Layout>
				<Header collapsed={collapsed} setCollapsed={setCollapsed} />
				<Content style={{ margin: "2em 1em 0", overflow: "initial" }}>
					<div style={{ padding: 24, textAlign: "center", background: colorBgContainer }}>
						<p>long content</p>
					</div>
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
}
