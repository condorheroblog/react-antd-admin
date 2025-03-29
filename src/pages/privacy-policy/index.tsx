import { useTranslation } from "react-i18next";
import { Typography } from "antd";

export default function PrivacyPolicy() {
	const { t } = useTranslation();
	return (
		<div className="p-4 dark:bg-black">
			<Typography.Title level={1}>{t("authority.privacyPolicy")}</Typography.Title>
		</div>
	);
}
