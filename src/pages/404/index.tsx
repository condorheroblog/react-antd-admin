import { ContainerLayout } from "#src/layout";
import { useUserStore } from "#src/store";
import { Button, Result } from "antd";

import { useTranslation } from "react-i18next";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function Error404() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const hasTokenInLocal = !!useUserStore(state => state.token);

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

	return hasTokenInLocal
		? (
			<Routes>
				<Route element={<ContainerLayout />} path="*">
					<Route path="*" element={Result404} />
				</Route>
			</Routes>
		)
		: (
			Result404
		);
}
