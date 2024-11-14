import { theme } from "antd";
import { useContext } from "react";

import { LayoutContext } from "../container-layout/layout-context";
import { Logo, SiderTrigger } from "../widgets";

export interface LayoutSidebarProps {
	children?: React.ReactNode
	computedSidebarWidth: number
}

export default function LayoutSidebar({ children, computedSidebarWidth }: LayoutSidebarProps) {
	const { sidebarCollapsed } = useContext(LayoutContext);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<aside
			style={
				{
					width: computedSidebarWidth,
					backgroundColor: colorBgContainer,
					boxShadow: "3px 0 5px 0 rgb(29, 35, 41, 0.05)",
				}
			}
			className="fixed left-0 top-0 bottom-0 transition-all overflow-y-auto border-r border-r-colorBorderSecondary"
		>
			<Logo sidebarCollapsed={sidebarCollapsed} />
			{children}
			<SiderTrigger />
		</aside>
	);
}
