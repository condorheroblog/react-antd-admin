import { useDeviceType } from "#src/hooks";
import { usePreferencesStore, useTabsStore } from "#src/store";
import { cn } from "#src/utils";

import { Drawer, Grid } from "antd";
import { useEffect, useMemo } from "react";
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
	const classes = useStyles();
	const screens = useBreakpoint();
	const { isTopNav, isTwoColumnNav, isMixedNav, sidebarWidth, sideCollapsedWidth, firstColumnWidthInTwoColumnNavigation } = useLayout();
	const isMaximize = useTabsStore(state => state.isMaximize);
	const { tabbarEnable, sidebarEnable, sidebarCollapsed, setPreferences } = usePreferencesStore();
	const { isMobile } = useDeviceType();
	const { sideNavItems, topNavItems, handleMenuSelect } = useMenu();

	useEffect(() => {
		/* iPad */
		if (screens.lg && !screens.xl) {
			setPreferences("sidebarCollapsed", true);
		}
		/* PC */
		else if (screens.xl) {
			setPreferences("sidebarCollapsed", false);
		}
		/* Mobile */
		else if (screens.xs || (screens.sm && !screens.md)) {
			setPreferences("sidebarCollapsed", false);
		}
	}, [screens]);

	const sidebarEnableState = useMemo(() => !isTopNav && sidebarEnable, [isTopNav, sidebarEnable]);
	const computedSidebarWidth = useMemo(() => {
		if (isMaximize || isMobile) {
			return 0;
		}
		const currentSidebarWidth = sidebarCollapsed ? sideCollapsedWidth : sidebarWidth;
		if (isTwoColumnNav) {
			/* 双列导航，第一列默认宽度 */
			return currentSidebarWidth + (firstColumnWidthInTwoColumnNavigation ?? 0);
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
		sideCollapsedWidth,
		firstColumnWidthInTwoColumnNavigation,
	]);

	return (

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
							onClose={() => setPreferences("sidebarCollapsed", false)}
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
	);
}
