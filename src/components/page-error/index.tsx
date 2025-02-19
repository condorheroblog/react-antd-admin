import type { FallbackProps } from "react-error-boundary";

// https://undraw.co/search
import BugFixing from "#src/assets/svg/undraw-bug-fixing.svg?react";

import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Result, Space, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const { VITE_BASE_HOME_PATH } = import.meta.env;

export function PageError({ error, resetErrorBoundary }: FallbackProps) {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const goHome = () => {
		resetErrorBoundary();
		navigate(VITE_BASE_HOME_PATH);
	};
	const refresh = () => {
		location.reload();
	};

	useEffect(() => {
		document.title = "Sorry, Page error occurred!";
	}, []);

	return (
		<Result
			status="error"
			icon={(
				<div className="w-7/12 md:w-3/12 xl:w-2/12 inline-block">
					<BugFixing />
				</div>
			)}
			title={error.message ?? "Sorry, Page error occurred!"}
			// subTitle={error.stack}
			extra={(
				<Space size={20}>
					<Button
						icon={<ArrowLeftOutlined />}
						type="primary"
						onClick={goHome}
					>
						{t("common.backHome")}
					</Button>
					<Button
						icon={<ReloadOutlined rotate={90} />}
						onClick={refresh}
					>
						{t("common.refresh")}
					</Button>
				</Space>
			)}
		>
			<Typography.Paragraph type="warning" className="text-center">
				{error.stack}
			</Typography.Paragraph>

		</Result>
	);
}
