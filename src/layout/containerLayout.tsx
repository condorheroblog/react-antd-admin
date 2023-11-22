import { Layout, theme } from "antd";
import { useState } from "react";
import { Logo } from "./components/logo";
import { Header } from "./components/header";
// import { Footer } from "./components/footer";
import { SiderMenu } from "./components/siderMenu";
import { ParentLayout } from "./parentLayout";

const { Content, Sider } = Layout;

export function ContainerLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ height: "100%" }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Logo collapsed={collapsed} />
				<SiderMenu />
			</Sider>
			<Layout>
				<Header collapsed={collapsed} setCollapsed={setCollapsed} />
				<Content style={{ overflow: "auto" }}>
					<div
						style={{
							margin: "1.5em 1em 1em",
							backgroundColor: colorBgContainer,
						}}
					>
						<ParentLayout />
					</div>
				</Content>
				{/* <Footer /> */}
			</Layout>
		</Layout>
	);
}
