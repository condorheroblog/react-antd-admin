import type { GlobalToken } from "antd";
import { Drawer, Layout, theme } from "antd";
import { useState } from "react";
import { createUseStyles } from "react-jss";

import { Logo } from "../logo";
import { Header } from "../header";
// import { Footer } from "./components/footer";
import { SiderMenu } from "../sider-menu";
import { ParentLayout } from "../parent-layout";
import { isMobile } from "#src/utils";

const { Content, Sider } = Layout;

const useStyles = createUseStyles((theme: GlobalToken) => {
	console.log(theme);
	return {
		drawerStyles: {
			"& .ant-drawer-body": {
				padding: 0,
				height: "100%",
				"&>ul": {
					paddingTop: "1em",
				},
			},
			"& .ant-drawer-header": {
				// backgroundColor: "#001529",
				display: "none",
			},
		},
	};
});

export function ContainerLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();

	return (
		<Layout style={{ height: "100%" }}>
			{isMobile() ? (
				<Drawer
					open={collapsed}
					placement="left"
					width="50vw"
					className={classes.drawerStyles}
					// title={<img src={logo} alt="logo" style={{ width: "1em" }} />}
					onClose={() => setCollapsed(false)}
				>
					<SiderMenu />
				</Drawer>
			) : (
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<Logo collapsed={collapsed} />
					<SiderMenu />
				</Sider>
			)}

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
