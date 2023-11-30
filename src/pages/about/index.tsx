import { useTranslation } from "react-i18next";
import { theme, Row, Col, Card, Descriptions, Tag, Typography } from "antd";

import { dependenciesItems, devDependenciesItems } from "./constants";

const { version } = __APP_INFO__.pkg;
const { lastBuildTime } = __APP_INFO__;

const { Text, Link } = Typography;

export default function About() {
	const { t } = useTranslation();
	const {
		token: { colorBgLayout },
	} = theme.useToken();

	const projectMessageItems = [
		{
			key: 1,
			label: t("about.version"),
			children: <Text code>{version}</Text>,
		},
		{
			key: 2,
			label: t("about.lastBuildTime"),
			children: <Tag color="#55acee">{lastBuildTime}</Tag>,
		},
		{
			key: 2,
			label: "Github",
			children: (
				<Link
					copyable
					href="https://github.com/condorheroblog/react-antd-admin"
					target="_blank"
				>
					react-antd-admin
				</Link>
			),
		},
	];

	return (
		<Row gutter={[0, 20]} style={{ backgroundColor: colorBgLayout }}>
			<Col span={24}>
				<Row>
					<Col>
						<Card title={t("about.aboutProject")}>
							<Descriptions
								items={[
									{
										key: 1,
										children: t("about.descriptions"),
									},
								]}
							/>
						</Card>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Card title={t("about.projectMessage")}>
					<Descriptions bordered items={projectMessageItems} />
				</Card>
			</Col>
			<Col span={24}>
				<Card title={t("about.dependencies")}>
					<Descriptions bordered items={dependenciesItems} />
				</Card>
			</Col>
			<Col span={24}>
				<Card title={t("about.devDependencies")}>
					<Descriptions bordered items={devDependenciesItems} />
				</Card>
			</Col>
		</Row>
	);
}
