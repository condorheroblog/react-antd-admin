import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Card, Radio } from "antd";
import { useEffect, useState } from "react";

import { fetchLine } from "#src/api/dashboard";

const weekdays = {
	Monday: "星期一",
	Tuesday: "星期二",
	Wednesday: "星期三",
	Thursday: "星期四",
	Friday: "星期五",
	Saturday: "星期六",
	Sunday: "星期日",
};
const DATA_KEYS = {
	week: Object.values(weekdays),
};

export default function LineChart() {
	const [value, setValue] = useState("week");

	const [data, setData] = useState<string[]>([]);

	const option: EChartsOption = {
		dataZoom: {
			type: value === "week" ? "inside" : "slider",
		},
		title: {
			text: "",
			subtext: "",
		},
		xAxis: {
			type: "category",
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			data: DATA_KEYS[value],
		},
		yAxis: {
			type: "value",
		},
		tooltip: {
			trigger: "axis",
			axisPointer: { type: "cross" },
		},
		series: [
			{
				type: "line",
				data,
			},
		],
	};

	useEffect(() => {
		if (value) {
			fetchLine({ range: value }).then(({ result }) => {
				setData(result);
			});
		}
	}, [value]);

	return (
		<Card
			title="销售额"
			extra={
				<Radio.Group
					defaultValue="week"
					buttonStyle="solid"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				>
					<Radio.Button value="week">本周</Radio.Button>
					<Radio.Button value="month">本月</Radio.Button>
					<Radio.Button value="year">本年</Radio.Button>
				</Radio.Group>
			}
		>
			<ReactECharts option={option} />
		</Card>
	);
}
