import type { SwitchProps } from "antd";
import { Switch } from "antd";

export interface SwitchItemProps extends Omit<SwitchProps, "onChange"> {
	children: React.ReactNode
	name: string
	onChange?: (a: string, b: unknown) => void
}

export function SwitchItem({ children, disabled, checked, name, onChange, ...restProps }: SwitchItemProps) {
	return (
		<div className="hover:bg-gray-100 dark:hover:bg-gray-700 my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5">
			<span className="flex items-center text-sm">{children}</span>
			<Switch
				disabled={disabled}
				checked={checked}
				size="default"
				onChange={() => onChange?.(name, !checked)}
				{...restProps}
			/>
		</div>
	);
}
