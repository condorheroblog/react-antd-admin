import { useDeviceType } from "#src/hooks";
import { usePreferencesStore, useTabsStore } from "#src/store";
import { cn } from "#src/utils";

import { Drawer, Grid } from "antd";
import { useEffect, useMemo, useState } from "react";
import { createUseStyles } from "react-jss";

import { useLayout } from "../hooks";
import LayoutContent from "../layout-content";
import LayoutFooter from "../layout-footer";
import LayoutHeader from "../layout-header";
import LayoutMenu from "../layout-menu";
import { useMenu } from "../layout-menu/use-menu";
import LayoutMixedSidebar from "../layout-mixed-sidebar";
import LayoutSidebar from "../layout-sidebar";
import LayoutTabbar from "../layout-tabbar";
import { BreadcrumbViews, Logo } from "../widgets";
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
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const classes = useStyles();
	const screens = useBreakpoint();
	const { isTopNav, isTwoColumnNav, isMixedNav, sidebarWidth, sideCollapseWidth } = useLayout();
	const isMaximize = useTabsStore(state => state.isMaximize);
	const tabbarEnable = usePreferencesStore(state => state.tabbarEnable);
	const { isMobile } = useDeviceType();
	const { sideNavItems, topNavItems, handleMenuSelect } = useMenu();

	useEffect(() => {
		/* iPad */
		if (screens.lg && !screens.xl) {
			setSidebarCollapsed(true);
		}
		/* PC */
		else if (screens.xl) {
			setSidebarCollapsed(false);
		}
		/* Mobile */
		else if (screens.xs || (screens.sm && !screens.md)) {
			setSidebarCollapsed(false);
		}
	}, [screens]);

	const layoutContextValue = useMemo(() => ({ sidebarCollapsed, setSidebarCollapsed }), [sidebarCollapsed, setSidebarCollapsed]);

	const sidebarEnableState = useMemo(() => !isTopNav, [isTopNav]);
	const computedSidebarWidth = useMemo(() => {
		if (isMaximize || isMobile) {
			return 0;
		}
		const currentSidebarWidth = sidebarCollapsed ? sideCollapseWidth : sidebarWidth;
		if (isTwoColumnNav) {
			/* 双列导航，第一列默认宽度 */
			return currentSidebarWidth + 80;
		}
		if (sidebarEnableState) {
			return currentSidebarWidth;
		}
		return 0;
	}, [
		// Mobile
		isMobile,
		isMaximize,
		isTwoColumnNav,
		sidebarEnableState,
		sidebarWidth,
		sidebarCollapsed,
		sideCollapseWidth,
	]);

	return (
		<LayoutContext.Provider value={layoutContextValue}>
			<section
				style={{
					paddingLeft: computedSidebarWidth,
				}}
				className={cn(
					"transition-all flex flex-col h-screen",
				)}
			>
				<LayoutHeader>
					{isTopNav || isMixedNav
						? (
							<>
								{isTopNav ? <Logo sidebarCollapsed={false} className="mr-8" /> : null}
								<LayoutMenu mode="horizontal" menus={topNavItems} handleMenuSelect={handleMenuSelect} />
							</>
						)
						: <BreadcrumbViews />}
				</LayoutHeader>
				{tabbarEnable ? <LayoutTabbar /> : null}

				{/* Mobile */}
				{
					isMobile
						? (
							<Drawer
								open={sidebarCollapsed}
								placement="left"
								width="clamp(200px, 50vw, 210px)"
								className={cn(classes.drawerStyles)}
								onClose={() => setSidebarCollapsed(false)}
							>
								<LayoutMenu autoOpenMenu menus={sideNavItems} handleMenuSelect={handleMenuSelect} />
							</Drawer>
						)
						: null
				}

				{/* PC */}
				{
					sidebarEnableState && !isTwoColumnNav
						? (
							<LayoutSidebar
								computedSidebarWidth={computedSidebarWidth}
							>
								<LayoutMenu
									autoOpenMenu
									menus={sideNavItems}
									handleMenuSelect={handleMenuSelect}
								/>
							</LayoutSidebar>
						)
						: null
				}
				{
					isTwoColumnNav
						? (
							<LayoutMixedSidebar
								computedSidebarWidth={computedSidebarWidth}
								sideNavItems={sideNavItems}
								topNavItems={topNavItems}
								handleMenuSelect={handleMenuSelect}
							/>
						)
						: null
				}

				<LayoutContent />

				<LayoutFooter className="bg-colorBgContainer" />
			</section>
		</LayoutContext.Provider>
	);
}
