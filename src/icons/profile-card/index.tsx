import type { GetProps } from "antd";
import Icon from "@ant-design/icons";

type CustomIconComponentProps = GetProps<typeof Icon>;

export function ProfileSvg() {
	return (
		/**
		 * 更改了以下 svg 原属性
		 * stroke-linecap => strokeLinecap
		 * stroke-width => strokeWidth
		 * stroke-linejoin => strokeLinejoin
		 */
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
			<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m7 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
		</svg>
	);
}
export function ProfileIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={ProfileSvg} {...props} />;
}
