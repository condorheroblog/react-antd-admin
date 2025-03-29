import { CloudOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useTranslation } from "react-i18next";

export default function AccessMode() {
	const { t } = useTranslation();

	return (
		<Result
			icon={<CloudOutlined />}
			status="success"
			title={t("access.accessMode.title")}
			subTitle={t("access.accessMode.description")}
		/>
	);
}
