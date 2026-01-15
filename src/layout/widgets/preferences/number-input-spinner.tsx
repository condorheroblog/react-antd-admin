import type { InputNumberProps } from "antd";

import { isNumber } from "#src/utils/is";
import { InputNumber } from "antd";

export interface NumberInputSpinnerProps {
	children: React.ReactNode
	name: string
	min: number
	max: number
	value?: number
	disabled?: boolean
	onChange?: (a: string, b: number) => void
}

export function NumberInputSpinner({
	children,
	disabled,
	value,
	name,
	onChange,
	min,
	max,
}: NumberInputSpinnerProps) {
	const handleChange: InputNumberProps["onChange"] = (v) => {
		if (v && isNumber(v)) {
			onChange?.(name, v as number);
		}
	};

	return (
		<div className="hover:bg-gray-100 dark:hover:bg-gray-700 my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5">
			<span className="flex items-center text-sm">{children}</span>
			<InputNumber
				className="w-40"
				min={min}
				max={max}
				precision={0}
				changeOnWheel
				mode="spinner"
				disabled={disabled}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}
