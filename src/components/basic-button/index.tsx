import type { ButtonProps } from "antd";
import type { ReactNode } from "react";
import { Button } from "antd";

interface BasicButtonProps extends ButtonProps {
	children?: ReactNode
}

export function BasicButton(props: BasicButtonProps) {
	const { children } = props;

	// 清除自定义属性
	const params: Partial<BasicButtonProps> = { ...props };

	return (
		<Button
			type="primary"
			{...params}
		>
			{children}
		</Button>
	);
}
