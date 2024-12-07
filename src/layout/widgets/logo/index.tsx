import logo from "#src/assets/svg/logo.svg?url";
import { Typography } from "antd";
import { clsx } from "clsx";

import { useNavigate } from "react-router";

const { Title } = Typography;

export interface LogoProps {
	sidebarCollapsed: boolean
	className?: string
}

/**
 * @zh 高度 48px
 * @en The height is 48px
 */
export function Logo({ sidebarCollapsed, className }: LogoProps) {
	const navigate = useNavigate();

	return (
		<div
			// 和 header 高度保持一致
			className={clsx("h-12 flex items-center justify-center gap-2 cursor-pointer", className)}
			onClick={() => navigate(import.meta.env.VITE_BASE_HOME_PATH)}
		>
			<img
				src={logo}
				alt="logo"
				width={32}
				height={32}
			/>

			<Title level={1} className={clsx("!text-sm !m-0", { hidden: sidebarCollapsed })} ellipsis={true}>
				{import.meta.env.VITE_GLOB_APP_TITLE}
			</Title>

		</div>
	);
}
