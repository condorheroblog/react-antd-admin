import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Card, Segmented } from "antd";
import { useEffect, useState } from "react";

import type { PieDataType } from "#src/api/dashboard";
import { fetchPie } from "#src/api/dashboard";

const DATA_KEY = {
	electronics: "电子产品",
	home_goods: "家居用品",
	apparel_accessories: "服装饰品",
	food_beverages: "食品饮料",
	beauty_skincare: "美容护肤",
};

export default function PieChart() {
	const [data, setData] = useState<PieDataType[]>([]);
	const [value, setValue] = useState<string | number>("全部渠道");

	const option: EChartsOption = {
		title: {
			text: "",
			subtext: "",
			right: "10%",
		},
		tooltip: {
			trigger: "item",
			formatter: "{a} <br/>{b} : {c} ({d}%)",
		},
		legend: {
			orient: "vertical",
			left: "left",
		},
		series: [
			{
				name: "销售额类别占比",
				type: "pie",
				radius: "55%",
				center: ["50%", "60%"],
				data,
				// emphasis: {
				// 	itemStyle: {
				// 		shadowBlur: 10,
				// 		shadowOffsetX: 0,
				// 		shadowColor: "rgba(0, 0, 0, 0.5)",
				// 	},
				// },
			},
		],
	};

	useEffect(() => {
		if (value) {
			fetchPie({ by: value }).then(({ result }) => {
				setData(
					result.map((item) => {
						const code = item.code as keyof typeof DATA_KEY;
						return {
							...item,
							name: DATA_KEY[code],
						};
					}),
				);
			});
		}
	}, [value]);

	return (
		<Card
			title="销售额类别占比"
			extra={
				<Segmented
					options={["全部渠道", "线上", "门店"]}
					value={value}
					onChange={(segmentedValue) => setValue(segmentedValue)}
				></Segmented>
			}
		>
			<ReactECharts option={option} />
		</Card>
	);
}
