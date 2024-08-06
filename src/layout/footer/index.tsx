import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

export default function Footer() {
	return (
		<AntdFooter className="absolute bottom-0 w-full px-0 py-3 bg-transparent flex justify-center text-xs md:text-sm">
			Copyright &copy; 2023 Condor Hero All right reserved
		</AntdFooter>
	);
}
