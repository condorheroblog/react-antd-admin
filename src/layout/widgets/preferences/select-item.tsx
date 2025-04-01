import type { SelectProps } from "antd";

import { usePreferencesStore } from "#src/store";
import { Select } from "antd";

export interface SelectItemProps {
	children: React.ReactNode
	name: string
	value?: string
	disabled?: boolean
	items: SelectProps["options"]
}

export function SelectItem({ children, items, disabled, value, name }: SelectItemProps) {
	const {
		setPreferences,
	} = usePreferencesStore();
	return (
		<div className="hover:bg-gray-100 dark:hover:bg-gray-700 my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5">
			<span className="flex items-center text-sm">{children}</span>
			<Select
				className="w-2/5"
				options={items}
				disabled={disabled}
				value={value}
				onChange={value => setPreferences(name, value)}
			/>
		</div>
	);
}
