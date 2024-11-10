import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
	const { t } = useTranslation();
	return (
		<>{t("common.privacyPolicy")}</>
	);
}
