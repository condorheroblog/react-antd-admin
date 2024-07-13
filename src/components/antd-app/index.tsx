import { App } from "antd";
import type { ReactNode } from "react";
import { StaticAntd } from "#src/utils";

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
