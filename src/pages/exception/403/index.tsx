import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Exception403() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const Result403 = (
		<Result
			status="403"
			title="403"
			subTitle={t("exception.403SubTitle")}
			extra={(
				<Button
					icon={<ArrowLeftOutlined />}
					type="primary"
					onClick={() => {
						navigate(import.meta.env.VITE_BASE_HOME_PATH);
					}}
				>
					{t("common.backHome")}
				</Button>
			)}
		/>
	);

	return Result403;
}
