import type { ReactNode } from "react";
import { StaticAntd } from "#src/utils";
import { App } from "antd";

export interface AntdAppProps {
	children: ReactNode
}
export function AntdApp({ children }: AntdAppProps) {
	return (
		<App className="h-full">
			<StaticAntd />
			{children}
		</App>
	);
}
