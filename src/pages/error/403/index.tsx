import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Auth403() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const Result403 = (
		<Result
			status="403"
			title="403"
			subTitle={t("common.403SubTitle")}
			extra={(
				<Button
					type="primary"
					onClick={() => {
						navigate("/");
					}}
				>
					{t("common.backHome")}
				</Button>
			)}
		/>
	);

	return Result403;
}
