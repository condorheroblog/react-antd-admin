import logo from "#src/assets/images/logo.svg?url";
import { Typography } from "antd";
import { clsx } from "clsx";

import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export interface LogoProps {
	collapsed: boolean
}

export default function Logo({ collapsed }: LogoProps) {
	const navigate = useNavigate();

	return (
		<div
			// 和 header 高度保持一致
			className="h-12 flex items-center justify-center gap-2 cursor-pointer"
			onClick={() => navigate(import.meta.env.VITE_BASE_HOME_PATH)}
		>
			<img
				src={logo}
				alt="logo"
				width={32}
				height={32}
			/>

			<Title level={1} className={clsx("!text-sm !m-0", { hidden: collapsed })} ellipsis={true}>React Antd Admin</Title>

		</div>
	);
}
