import { BasicContent } from "#src/components";

import { Badge, Card, Col, Descriptions, Row, Tag, theme, Typography } from "antd";
import { useTranslation } from "react-i18next";

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
			key: 3,
			label: t("about.license"),
			children: <Tag color="green">{__APP_INFO__.pkg.license}</Tag>,
		},
		{
			key: 4,
			label: t("about.previewAddress"),
			children: (
				<Link
					rel="noreferrer noopener"
					copyable
					target="_blank"
					href="https://condorheroblog.github.io/react-antd-admin/"
				>
					{t("common.view")}
				</Link>
			),
		},
		{
			key: 5,
			label: t("about.documentAddress"),
			children: (
				<Link
					rel="noreferrer noopener"
					copyable
					target="_blank"
					href="https://condorheroblog.github.io/react-antd-admin/docs/"
				>
					{t("common.view")}
				</Link>
			),
		},
		{
			key: 6,
			label: "Github",
			children: (
				<Link
				rel="noreferrer noopener"
				copyable
				target="_blank"
				href="https://github.com/condorheroblog/react-antd-admin"
				>
					{import.meta.env.VITE_GLOB_APP_TITLE}
				</Link>
			),
		},
		{
			key: 7,
			label: t("about.author"),
			children: (
				<Link
					rel="noreferrer noopener"
					target="_blank"
					href="https://github.com/condorheroblog/"
				>
					{__APP_INFO__.pkg.author}
				</Link>
			),
		},
	];

	return (
		<BasicContent>
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
					<Badge.Ribbon text={dependenciesItems.length} color="green">
						<Card title={t("about.dependencies")}>
							<Descriptions bordered items={dependenciesItems} />
						</Card>
					</Badge.Ribbon>
				</Col>
				<Col span={24}>
					<Badge.Ribbon text={devDependenciesItems.length} color="blue">
						<Card title={t("about.devDependencies")}>
							<Descriptions bordered items={devDependenciesItems} />
						</Card>
					</Badge.Ribbon>
				</Col>
			</Row>
		</BasicContent>
	);
}
