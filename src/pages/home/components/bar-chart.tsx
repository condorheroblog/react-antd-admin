import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

export default function BarChart() {
	const { t } = useTranslation();
	const option: EChartsOption = {
		title: {
			text: "",
			subtext: "",
		},
		xAxis: {
			type: "category",
			data: [
				t("home.directAccess"),
				t("home.emailMarketing"),
				t("home.affiliateAdvertise"),
				t("home.videoAdvertise"),
			],
		},
		yAxis: {
			type: "value",
		},
		tooltip: {},
		series: [
			{
				type: "bar",
				data: [
					{ value: 335, name: t("home.directAccess") },
					{ value: 310, name: t("home.emailMarketing") },
					{ value: 234, name: t("home.affiliateAdvertise") },
					{ value: 135, name: t("home.videoAdvertise") },
				],
			},
		],
	};
	return (
		<Card title={t("home.views")}>
			<ReactECharts opts={{ height: "auto", width: "auto" }} option={option} />
		</Card>
	);
}
