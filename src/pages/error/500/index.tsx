import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Error500() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const Result500 = (
		<Result
			status="500"
			title="500"
			subTitle={t("common.500SubTitle")}
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

	return Result500;
}
