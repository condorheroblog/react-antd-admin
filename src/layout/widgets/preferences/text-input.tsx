import { Input } from "antd";

export interface TextInputProps {
	children: React.ReactNode
	name: string
	value?: string
	disabled?: boolean
	onChange?: (name: string, value: string) => void
}

export function TextInput({
	children,
	disabled,
	value,
	name,
	onChange,
}: TextInputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event) {
			onChange?.(name, event.target.value);
		}
	};

	return (
		<div className="hover:bg-gray-100 dark:hover:bg-gray-700 my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5">
			<span className="flex items-center text-sm">{children}</span>
			<Input
				className="w-40"
				disabled={disabled}
				allowClear
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}
