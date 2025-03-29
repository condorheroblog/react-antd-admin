import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Exception500() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const Result500 = (
		<Result
			status="500"
			title="500"
			subTitle={t("exception.500SubTitle")}
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

	return Result500;
}
