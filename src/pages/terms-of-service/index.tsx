import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export default function TermsOfService() {
	const { t } = useTranslation();
	return (
		<div className="p-4 dark:bg-black">
			<Typography.Title level={1}>
				<>{t("authority.termsOfService")}</>
			</Typography.Title>
		</div>
	);
}
