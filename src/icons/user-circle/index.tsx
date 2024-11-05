import type { GetProps } from "antd";
import Icon from "@ant-design/icons";

type CustomIconComponentProps = GetProps<typeof Icon>;

export function UserCircleSvg() {
	return (
		/**
		 * 更改了以下 svg 原属性
		 * stroke-linecap => strokeLinecap
		 * stroke-width => strokeWidth
		 */
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" strokeWidth="1.5">
				<circle cx="12" cy="9" r="3" />
				<circle cx="12" cy="12" r="10" />
				<path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" />
			</g>
		</svg>
	);
}
export function UserCircleIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={UserCircleSvg} {...props} />;
}
