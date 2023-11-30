import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Card } from "antd";

export default function BarChart() {
	const option: EChartsOption = {
		title: {
			text: "",
			subtext: "",
		},
		xAxis: {
			type: "category",
			data: ["直接访问", "邮件营销", "联盟广告", "视频广告"],
		},
		yAxis: {
			type: "value",
		},
		tooltip: {},
		series: [
			{
				type: "bar",
				data: [
					{ value: 335, name: "直接访问" },
					{ value: 310, name: "邮件营销" },
					{ value: 234, name: "联盟广告" },
					{ value: 135, name: "视频广告" },
				],
			},
		],
	};
	return (
		<Card title="访问量">
			<ReactECharts option={option} />
		</Card>
	);
}
