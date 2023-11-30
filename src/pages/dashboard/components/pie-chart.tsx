import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Card, Segmented } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { PieDataType } from "#src/api/dashboard";
import { fetchPie } from "#src/api/dashboard";

export default function PieChart() {
	const { t } = useTranslation();
	const [data, setData] = useState<PieDataType[]>([]);
	const [value, setValue] = useState<string | number>(
		t("dashboard.allChannels"),
	);

	const DATA_KEY = {
		electronics: t("dashboard.electronics"),
		home_goods: t("dashboard.homeGoods"),
		apparel_accessories: t("dashboard.apparelAccessories"),
		food_beverages: t("dashboard.foodBeverages"),
		beauty_skincare: t("dashboard.beautySkincare"),
	};

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
				name: t("dashboard.salesCategoryProportion"),
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
			title={t("dashboard.salesCategoryProportion")}
			extra={
				<Segmented
					options={[
						t("dashboard.allChannels"),
						t("dashboard.online"),
						t("dashboard.site"),
					]}
					value={value}
					onChange={(segmentedValue) => setValue(segmentedValue)}
				></Segmented>
			}
		>
			<ReactECharts option={option} />
		</Card>
	);
}
