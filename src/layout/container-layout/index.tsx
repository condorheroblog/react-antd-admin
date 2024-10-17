import { useGlobalStore, useTabsStore } from "#src/store";
import { Drawer, Layout, theme } from "antd";
import { clsx } from "clsx";
import { useState } from "react";

import { createUseStyles } from "react-jss";
import BasicTabs from "../basic-tabs";
import Header from "../header";
import Logo from "../logo";
import ParentLayout from "../parent-layout";

// import Footer from "./components/footer";
import SiderMenu from "../sider-menu";

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
	const isDark = useGlobalStore(state => state.isDark);
	const isRefresh = useTabsStore(state => state.isRefresh);
	const isMaximize = useTabsStore(state => state.isMaximize);

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
					<Sider
						theme={isDark ? "dark" : "light"}
						trigger={null}
						collapsible
						collapsed={collapsed}
						className={clsx("transition", { "!max-w-0 !min-w-0 opacity-0": isMaximize })}
					>
						<Logo collapsed={collapsed} />
						<SiderMenu />
					</Sider>
				)}

			<Layout>
				<Header collapsed={collapsed} setCollapsed={setCollapsed} className={clsx("transition-all", { "-mt-12": isMaximize })} />
				<BasicTabs />
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
						{!isRefresh ? <ParentLayout /> : null}
					</main>
				</Content>
				{/* <Footer /> */}
			</Layout>
		</Layout>
	);
}
