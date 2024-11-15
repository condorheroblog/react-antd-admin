import type { MenuProps } from "antd";
import type { MenuItemType } from "../layout-menu/types";

import { Scrollbar } from "#src/components";
import { LayoutContext } from "#src/layout/container-layout/layout-context";

import { theme } from "antd";
import { useContext } from "react";

import LayoutMenu from "../layout-menu";
import { SiderTrigger } from "../widgets";
import FirstColumnMenu from "./first-column-menu";

interface LayoutMixedSidebarProps {
	computedSidebarWidth?: number
	topNavItems?: MenuItemType[]
	sideNavItems?: MenuItemType[]
	handleMenuSelect?: (key: string, mode: MenuProps["mode"]) => void
}

const emptyArray: MenuItemType[] = [];
const zero = 0;
/**
 * 双列布局侧边栏
 */
export default function LayoutMixedSidebar({
	computedSidebarWidth = zero,
	sideNavItems = emptyArray,
	topNavItems = emptyArray,
	handleMenuSelect,
}: LayoutMixedSidebarProps) {
	const { sidebarCollapsed } = useContext(LayoutContext);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<aside className="fixed left-0 top-0 bottom-0 flex" style={{ backgroundColor: colorBgContainer, boxShadow: "3px 0 5px 0 rgb(29, 35, 41, 0.05)" }}>
			<FirstColumnMenu menus={topNavItems} handleMenuSelect={handleMenuSelect} />
			<div style={{ width: computedSidebarWidth - 80 }} className="relative transition-all">
				{
					!sidebarCollapsed
						? (
							<h1 className="pl-2 text-lg my-3 mx-3">
								{import.meta.env.VITE_GLOB_APP_TITLE}
							</h1>
						)
						: null
				}
				<div className="overflow-hidden" style={{ height: "calc(100% - 52px - 40px)" }}>
					<Scrollbar>
						<LayoutMenu
							autoOpenMenu
							menus={sideNavItems}
							handleMenuSelect={handleMenuSelect}
						/>
					</Scrollbar>
				</div>
				<SiderTrigger />
			</div>
		</aside>
	);
}
