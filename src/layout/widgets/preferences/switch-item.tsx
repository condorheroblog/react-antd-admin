import { usePreferencesStore } from "#src/store";

import { Switch } from "antd";

export interface SwitchItemProps {
	children: React.ReactNode
	name: string
	checked?: boolean
	disabled?: boolean
}

export function SwitchItem({ children, disabled, checked, name }: SwitchItemProps) {
	const { setPreferences } = usePreferencesStore();

	return (
		<div className="hover:bg-accent my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5">
			<span className="flex items-center text-sm">{children}</span>
			<Switch
				disabled={disabled}
				checked={checked}
				size="default"
				onChange={() => setPreferences(name, !checked)}
			/>
		</div>
	);
}
