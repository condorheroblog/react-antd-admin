import type { PieDataType } from "#src/api/home";
import type { EChartsOption } from "echarts";
import { fetchPie } from "#src/api/home";
import { Card, Segmented } from "antd";
import ReactECharts from "echarts-for-react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PieChart() {
	const { t } = useTranslation();
	const [data, setData] = useState<PieDataType[]>([]);
	const [value, setValue] = useState<string | number>(
		t("home.allChannels"),
	);

	const DATA_KEY = {
		electronics: t("home.electronics"),
		home_goods: t("home.homeGoods"),
		apparel_accessories: t("home.apparelAccessories"),
		food_beverages: t("home.foodBeverages"),
		beauty_skincare: t("home.beautySkincare"),
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
				name: t("home.salesCategoryProportion"),
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
			title={t("home.salesCategoryProportion")}
			extra={(
				<Segmented
					options={[
						t("home.allChannels"),
						t("home.online"),
						t("home.site"),
					]}
					value={value}
					onChange={segmentedValue => setValue(segmentedValue)}
				/>
			)}
		>
			<ReactECharts opts={{ height: "auto", width: "auto" }} option={option} />
		</Card>
	);
}
