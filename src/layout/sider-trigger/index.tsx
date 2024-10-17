import { BasicButton } from "#src/components";
import { LayoutContext } from "#src/layout/container-layout/layout-context";
import { cn } from "#src/utils";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useContext } from "react";

interface SiderTriggerProps {
	className?: string
}
export default function SiderTrigger({ className }: SiderTriggerProps) {
	const { collapsed, setCollapsed } = useContext(LayoutContext);

	return (
		<BasicButton
			type="text"
			style={{
				boxShadow: "0px -3px 5px 0 rgb(29, 35, 41, 0.05)",
			}}
			icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			onClick={() => setCollapsed(!collapsed)}
			className={cn(className, "absolute bottom-0 h-10 !w-full rounded-none border border-t-gray-200")}
		/>
	);
}
