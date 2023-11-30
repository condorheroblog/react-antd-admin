import type { ColProps } from "antd";
import { Card, Row, Col } from "antd";
import {
	UserOutlined,
	MessageOutlined,
	MoneyCollectOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const wrapperCol: ColProps = {
	xs: 24,
	sm: 24,
	md: 12,
	lg: 12,
	xl: 12,
	xxl: 6,
};
export default function CardList() {
	return (
		<Row justify="space-between" gutter={[20, 20]}>
			<Col {...wrapperCol}>
				<Card>
					<Meta
						avatar={<UserOutlined style={{ fontSize: 30 }} />}
						title="New Visits"
						description="102,400"
					/>
				</Card>
			</Col>
			<Col {...wrapperCol}>
				<Card>
					<Meta
						avatar={<MessageOutlined style={{ fontSize: 30 }} />}
						title="Messages"
						description="81,212"
					/>
				</Card>
			</Col>
			<Col {...wrapperCol}>
				<Card>
					<Meta
						avatar={<MoneyCollectOutlined style={{ fontSize: 30 }} />}
						title="Purchases"
						description="9,280"
					/>
				</Card>
			</Col>
			<Col span={6} {...wrapperCol}>
				<Card>
					<Meta
						avatar={<ShoppingCartOutlined style={{ fontSize: 30 }} />}
						title="Shoppings"
						description="13,600"
					/>
				</Card>
			</Col>
		</Row>
	);
}
