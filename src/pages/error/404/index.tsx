import { ContainerLayout } from "#src/layout";
import { useAuthStore } from "#src/store";
import { Button, Result } from "antd";

import { useTranslation } from "react-i18next";
import { Route, Routes, useNavigate } from "react-router-dom";

interface Error404Props {
	showLayout?: boolean
}
export default function Error404({ showLayout }: Error404Props) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const hasTokenInLocal = !!useAuthStore(state => state.token);

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

	if (!showLayout) {
		return Result404;
	}

	return hasTokenInLocal
		? (
			<Routes>
				<Route element={showLayout ? <ContainerLayout /> : null} path="*">
					<Route path="*" element={Result404} />
				</Route>
			</Routes>
		)
		: (
			Result404
		);
}
