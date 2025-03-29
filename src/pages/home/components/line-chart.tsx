import type { EChartsOption } from "echarts";
import { fetchLine } from "#src/api/home";
import { Card, Radio } from "antd";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

export default function LineChart() {
	const { t } = useTranslation();
	const [value, setValue] = useState("week");

	const [data, setData] = useState<string[]>([]);

	const DATA_KEYS = {
		week: [
			t("home.monday"),
			t("home.thursday"),
			t("home.wednesday"),
			t("home.thursday"),
			t("home.friday"),
			t("home.saturday"),
			t("home.sunday"),
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
			// @ts-expect-error: xxx
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
			title={t("home.sales")}
			extra={(
				<Radio.Group
					defaultValue="week"
					buttonStyle="solid"
					value={value}
					onChange={e => setValue(e.target.value)}
				>
					<Radio.Button value="week">{t("home.thisWeek")}</Radio.Button>
					<Radio.Button value="month">{t("home.thisMonth")}</Radio.Button>
					<Radio.Button value="year">{t("home.thisYear")}</Radio.Button>
				</Radio.Group>
			)}
		>
			<ReactECharts
				opts={{ height: "auto", width: "auto" }}
				option={option}
			/>
		</Card>
	);
}
