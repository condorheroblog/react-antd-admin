import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

export default function CommonVisible() {
	const { t } = useTranslation();

	return (
		<Result
			icon={<SmileOutlined />}
			status="success"
			title={t("access.commonVisible.title")}
			subTitle={t("access.commonVisible.description")}
		/>
	);
}
