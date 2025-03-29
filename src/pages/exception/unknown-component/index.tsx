import { AppstoreOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { Button, Result, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const { Paragraph } = Typography;

export default function UnknownComponent() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Result
			status="warning"
			icon={<AppstoreOutlined />}
			title={t("common.menu.exceptionUnknownComponent")}
			subTitle={t("exception.unknownComponentSubTitle")}
			extra={(
				<div>
					<Paragraph code copyable={{ text: location.href }}>
						{location.href}
					</Paragraph>
					<Button
						icon={<ArrowLeftOutlined />}
						type="primary"
						onClick={() => {
							navigate(import.meta.env.VITE_BASE_HOME_PATH);
						}}
					>
						{t("common.backHome")}
					</Button>
				</div>

			)}
		/>
	);
}
