import { useTabsStore } from "#src/store";
import { cn } from "#src/utils";
import { Drawer, Grid, theme } from "antd";
import KeepAlive, { useKeepaliveRef } from "keepalive-for-react";
import { useEffect, useMemo, useState } from "react";
import { createUseStyles } from "react-jss";
import { useLocation, useOutlet } from "react-router-dom";

import BasicTabs from "../basic-tabs";
import Footer from "../footer";
import Header from "../header";
import Logo from "../logo";
import SiderMenu from "../sider-menu";
import SiderTrigger from "../sider-trigger";
import { LayoutContext } from "./layout-context";

const { useBreakpoint } = Grid;
const useStyles = createUseStyles({
	drawerStyles: {
		"& .ant-drawer-body": {
			"padding": 0,
			"&>ul": {
				paddingTop: "1em",
			},
		},
		"& .ant-drawer-header": {
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
		token: { colorBgContainer, colorBgLayout },
	} = theme.useToken();
	const classes = useStyles();
	const screens = useBreakpoint();
	const { pathname, search } = useLocation();
	const outlet = useOutlet();
	const aliveRef = useKeepaliveRef();
	const isRefresh = useTabsStore(state => state.isRefresh);
	const isMaximize = useTabsStore(state => state.isMaximize);
	const openTabs = useTabsStore(state => state.openTabs);

	/**
	 * to distinguish different pages to cache
	 */
	const cacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	/**
	 * 当使用关闭当前标签页、关闭右侧标签页、关闭左侧标签页、关闭其他标签页、关闭所有标签页功能时，需要清除这个标签页的缓存
	 */
	useEffect(() => {
		const cacheNodes = aliveRef.current?.getCaches();
		cacheNodes?.forEach((node) => {
			if (!openTabs.has(node.name)) {
				aliveRef.current?.removeCache(node.name);
			}
		});
	}, [openTabs]);

	useEffect(() => {
		/* iPad */
		if (screens.lg && !screens.xl) {
			setCollapsed(true);
		}
		/* PC */
		else if (screens.xl) {
			setCollapsed(false);
		}
		/* Mobile */
		else if (screens.sm && !screens.md) {
			setCollapsed(false);
		}
	}, [screens]);

	const layoutContextValue = useMemo(() => ({ collapsed, setCollapsed }), [collapsed, setCollapsed]);

	return (
		<LayoutContext.Provider value={layoutContextValue}>
			<section className={cn(
				"transition-all flex flex-col h-screen",
				/* Mobile */
				"pl-0",
				collapsed ? "md:pl-14" : "md:pl-52",
				{ "md:pl-0": isMaximize },
			)}
			>
				<Header />
				<BasicTabs />

				{/* Mobile */}
				<Drawer
					rootClassName="block md:hidden"
					open={collapsed}
					placement="left"
					width="clamp(200px, 50vw, 210px)"
					className={cn(classes.drawerStyles)}
					onClose={() => setCollapsed(false)}
				>
					<SiderMenu />
				</Drawer>

				{/* PC */}
				<aside
					style={
						{
							backgroundColor: colorBgContainer,
							boxShadow: "3px 0 5px 0 rgb(29, 35, 41, 0.05)",
						}
					}
					className={cn(
						"fixed left-0 top-0 bottom-0 transition-all overflow-y-auto",
						collapsed ? "md:w-14" : "md:w-52",
						{ "md:w-0": isMaximize },
						/* hidden in mobile */
						"hidden md:block",
					)}
				>
					<Logo collapsed={collapsed} />
					<SiderMenu />
					<SiderTrigger />
				</aside>

				<main
					className="overflow-y-auto p-4 flex-grow"
					style={
						{
							backgroundColor: colorBgLayout,
						}
					}
				>
					{!isRefresh
						? (
							<KeepAlive
								max={20}
								strategy="PRE"
								activeName={cacheKey}
								aliveRef={aliveRef}
							>
								{outlet}
							</KeepAlive>
						)
						: null}
				</main>
				<Footer />
			</section>
		</LayoutContext.Provider>
	);
}
