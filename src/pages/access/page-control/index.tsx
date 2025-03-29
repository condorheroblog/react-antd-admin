import type { PasswordLoginFormType } from "#src/pages/login/components/password-login";
import { BasicContent } from "#src/components";
import { usePreferences, AccessControlRoles } from "#src/hooks";
import { useAuthStore, useUserStore } from "#src/store";
import { Alert, Button, Card, Typography } from "antd";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const accounts: Record<string, PasswordLoginFormType> = {
	[AccessControlRoles.admin]: {
		password: "123456789admin",
		username: AccessControlRoles.admin,
	},
	[AccessControlRoles.common]: {
		password: "123456789admin",
		username: AccessControlRoles.common,
	},
};

export default function PageControl() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { enableFrontendAceess, enabledBackendAccess, setPreferences } = usePreferences();
	const { roles: userRoles } = useUserStore();
	const resetAllStores = useAuthStore(state => state.reset);
	const authLogin = useAuthStore(state => state.login);

	function roleButtonType(role: string) {
		return userRoles.includes(role) ? "primary" : "default";
	}

	function changeAccount(role: string) {
		if (userRoles.includes(role)) {
			return;
		}

		const account = accounts[role];
		resetAllStores();
		if (account) {
			authLogin(account).then(() => {
				navigate(0);
			});
		}
	}

	async function toggleAccessMode() {
		if (enableFrontendAceess && !enabledBackendAccess) {
			setPreferences({
				enableFrontendAceess: false,
				enabledBackendAccess: true,
			});
			resetAllStores();
			authLogin(accounts.admin).then(() => {
				setTimeout(() => {
					navigate(0);
				}, 150);
			});
			return;
		}
		if (enabledBackendAccess && !enableFrontendAceess) {
			setPreferences({
				enableFrontendAceess: true,
				enabledBackendAccess: false,
			});
			resetAllStores();
			authLogin(accounts.admin).then(() => {
				setTimeout(() => {
					navigate(0);
				}, 150);
			});
			return;
		}
		window.$message?.warning(t("access.pageControl.warningMessage"));
	}

	return (
		<BasicContent className="flex flex-col gap-4">
			<Alert type="info" message={t("access.pageControl.alertMessage")} description={t("access.pageControl.alertDescription")}></Alert>
			<Card title={t("access.pageControl.cardTitle")}>
				<Alert
					type="warning"
					className={clsx(
						"mb-4",
						{ hidden: enableFrontendAceess !== enabledBackendAccess },
					)}
					description={t("access.pageControl.warningMessage")}
				/>
				<div className="flex items-center gap-4">
					{t("access.pageControl.currentPermissionMode")}
					{enableFrontendAceess
						? (
							<Typography.Text code>{t("access.pageControl.frontendControl")}</Typography.Text>
						)
						: (
							""
						)}

					{enabledBackendAccess
						? (
							<Typography.Text code>{t("access.pageControl.backendControl")}</Typography.Text>
						)
						: (
							""
						)}

					{enabledBackendAccess
						? (
							<Button
								disabled={enableFrontendAceess === enabledBackendAccess}
								type="primary"
								onClick={() => toggleAccessMode()}
							>
								{t("access.pageControl.switchToFrontend")}
							</Button>
						)
						: null}
					{enableFrontendAceess
						? (
							<Button
								disabled={enableFrontendAceess === enabledBackendAccess}
								type="primary"
								onClick={() => toggleAccessMode()}
							>
								{t("access.pageControl.switchToBackend")}
							</Button>
						)
						: null}
				</div>
			</Card>
			<Card title={t("access.pageControl.accountSwitching")}>
				<div className="flex gap-4">
					<Button type={roleButtonType(AccessControlRoles.admin)} onClick={() => changeAccount(AccessControlRoles.admin)}>
						{t("access.pageControl.switchAdmin")}
					</Button>
					<Button type={roleButtonType(AccessControlRoles.common)} onClick={() => changeAccount(AccessControlRoles.common)}>
						{t("access.pageControl.switchCommon")}
					</Button>
				</div>
			</Card>
		</BasicContent>
	);
}
