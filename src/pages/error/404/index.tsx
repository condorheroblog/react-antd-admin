import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Error404() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const Result404 = (
		<Result
			status="404"
			title="404"
			subTitle={t("common.404SubTitle")}
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

	return Result404;
}
