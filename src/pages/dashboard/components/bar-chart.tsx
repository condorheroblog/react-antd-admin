import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Card } from "antd";
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
				t("dashboard.directAccess"),
				t("dashboard.emailMarketing"),
				t("dashboard.affiliateAdvertise"),
				t("dashboard.videoAdvertise"),
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
					{ value: 335, name: t("dashboard.directAccess") },
					{ value: 310, name: t("dashboard.emailMarketing") },
					{ value: 234, name: t("dashboard.affiliateAdvertise") },
					{ value: 135, name: t("dashboard.videoAdvertise") },
				],
			},
		],
	};
	return (
		<Card title={t("dashboard.views")}>
			<ReactECharts option={option} />
		</Card>
	);
}
