import { Drawer, Layout, theme } from "antd";
import { useState } from "react";
import { createUseStyles } from "react-jss";

import Logo from "../logo";
import Header from "../header";
// import Footer from "./components/footer";
import SiderMenu from "../sider-menu";
import ParentLayout from "../parent-layout";
import BreadcrumbTags from "../breadcrumb-tags";

import { useGlobalStore } from "#src/store";

const { Content, Sider } = Layout;

const useStyles = createUseStyles({
	drawerStyles: {
		"& .ant-drawer-body": {
			"padding": 0,
			"height": "100%",
			"&>ul": {
				paddingTop: "1em",
			},
		},
		"& .ant-drawer-header": {
			// backgroundColor: "#001529",
			display: "none",
		},
	},
});

/**
 * Please do not use this component through lazy, otherwise the switching routing page will flash.
 * 请不要通过 lazy 使用这个组件，否则切换路由页面会发生闪动。
 *
 * NO:
 * const ContainerLayout = lazy(() => import("#src/layout/container-layout"));
 *
 * YES:
 * import { ContainerLayout } from "#src/layout";
 */
export default function ContainerLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const classes = useStyles();
	const isMobile = useGlobalStore(state => state.isMobile);

	return (
		<Layout>
			{isMobile
				? (
					<Drawer
						open={collapsed}
						placement="left"
						width="clamp(200px, 50vw, 210px)"
						className={classes.drawerStyles}
						// title={<img src={logo} alt="logo" style={{ width: "1em" }} />}
						onClose={() => setCollapsed(false)}
					>
						<SiderMenu />
					</Drawer>
				)
				: (
					<Sider trigger={null} collapsible collapsed={collapsed}>
						<Logo collapsed={collapsed} />
						<SiderMenu />
					</Sider>
				)}

			<Layout>
				<Header collapsed={collapsed} setCollapsed={setCollapsed} />
				<BreadcrumbTags />
				<Content
					style={{
						scrollBehavior: "smooth",
						overflow: "auto",
						padding: "0.5em 1em 1em",
						height: "calc(100vh - 48px - 32.391px - 2px)",
					}}
				>
					<main
						style={{
							backgroundColor: colorBgContainer,
						}}
					>
						<ParentLayout />
					</main>
				</Content>
				{/* <Footer /> */}
			</Layout>
		</Layout>
	);
}
