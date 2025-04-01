import { isNumber } from "#src/utils";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { Button, InputNumber } from "antd";

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
	const isMax = value === max;
	const isMin = value === min;

	const handleDecrement = () => {
		if (value && isNumber(value) && !isMin) {
			onChange?.(name, value - 1);
		}
	};
	const handleIncrement = () => {
		if (value && isNumber(value) && !isMax) {
			onChange?.(name, value + 1);
		}
	};

	const handleChange = (v: number | null) => {
		if (v && isNumber(v)) {
			onChange?.(name, v);
		}
	};

	return (
		<div className="hover:bg-gray-100 dark:hover:bg-gray-700 my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5">
			<span className="flex items-center text-sm">{children}</span>
			<InputNumber
				className="w-40 [&_input]:!text-center [&_.ant-input-number-group-addon]:px-0"
				min={min}
				max={max}
				precision={0}
				changeOnWheel
				addonBefore={(
					<Button
						className="rounded-none"
						type="text"
						disabled={isMin}
						onPointerDown={handleDecrement}
						icon={<MinusOutlined />}
					/>
				)}
				addonAfter={(
					<Button
						className="rounded-none"
						type="text"
						disabled={isMax}
						onPointerDown={handleIncrement}
						icon={<PlusOutlined />}
					/>
				)}
				controls={false}
				disabled={disabled}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}
