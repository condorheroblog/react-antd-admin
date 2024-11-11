import type { ColProps } from "antd";

import { BasicContent } from "#src/components";
import { Col, Row } from "antd";

import BarChart from "./components/bar-chart";
import CardList from "./components/card-list";
import LineChart from "./components/line-chart";

import PieChart from "./components/pie-chart";

const wrapperCol: ColProps = {
	xs: 24,
	sm: 24,
	md: 12,
	lg: 12,
	xl: 12,
	xxl: 12,
};
export default function Home() {
	return (
		<BasicContent>
			<Row gutter={[20, 20]}>
				<Col span={24}>
					<CardList />
				</Col>
				<Col span={24}>
					<LineChart />
				</Col>
				<Col span={24}>
					<Row justify="space-between" gutter={[20, 20]}>
						<Col {...wrapperCol}>
							<BarChart />
						</Col>
						<Col {...wrapperCol}>
							<PieChart />
						</Col>
					</Row>
				</Col>
			</Row>
		</BasicContent>
	);
}
