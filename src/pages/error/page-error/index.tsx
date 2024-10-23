import type { FallbackProps } from "react-error-boundary";
import { Button, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// https://undraw.co/search
import BugFixing from "./undraw-bug-fixing.svg";

const { VITE_BASE_HOME_PATH } = import.meta.env;

export default function PageError({ error, resetErrorBoundary }: FallbackProps) {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const goHome = () => {
		resetErrorBoundary();
		navigate(VITE_BASE_HOME_PATH);
	};

	useEffect(() => {
		document.title = "Sorry, Page error occurred!";
	}, []);

	return (
		<div className="mt-10 mx-auto flex max-w-[400px] flex-col items-center justify-center gap-5">

			<Typography.Title level={3} className="text-center">
				Sorry, Page error occurred!
			</Typography.Title>

			<Typography.Paragraph type="danger" className="text-center">
				{error.message}
			</Typography.Paragraph>

			<Typography.Paragraph type="warning" className="text-center">
				{error.stack}
			</Typography.Paragraph>

			<div className="w-7/12">
				<BugFixing />
			</div>

			<Button
				type="primary"
				onClick={goHome}
			>
				{t("common.backHome")}
			</Button>
		</div>
	);
}
