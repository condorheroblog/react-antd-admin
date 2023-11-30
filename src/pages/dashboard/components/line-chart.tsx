import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Card, Radio } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchLine } from "#src/api/dashboard";

export default function LineChart() {
	const { t } = useTranslation();
	const [value, setValue] = useState("week");

	const [data, setData] = useState<string[]>([]);

	const DATA_KEYS = {
		week: [
			t("dashboard.monday"),
			t("dashboard.thursday"),
			t("dashboard.wednesday"),
			t("dashboard.thursday"),
			t("dashboard.friday"),
			t("dashboard.saturday"),
			t("dashboard.sunday"),
		],
	};

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
			title={t("dashboard.sales")}
			extra={
				<Radio.Group
					defaultValue="week"
					buttonStyle="solid"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				>
					<Radio.Button value="week">{t("dashboard.thisWeek")}</Radio.Button>
					<Radio.Button value="month">{t("dashboard.thisMonth")}</Radio.Button>
					<Radio.Button value="year">{t("dashboard.thisYear")}</Radio.Button>
				</Radio.Group>
			}
		>
			<ReactECharts option={option} />
		</Card>
	);
}
