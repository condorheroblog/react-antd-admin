import { useTranslation } from "react-i18next";

export default function TermsOfService() {
	const { t } = useTranslation();
	return (
		<>{t("common.termsOfService")}</>
	);
}
