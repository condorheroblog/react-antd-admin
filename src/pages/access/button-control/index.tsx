import type { PasswordLoginFormType } from "#src/pages/login/components/password-login";
import { AccessControl, BasicContent } from "#src/components";
import { accessControlCodes, AccessControlRoles, useAccess } from "#src/hooks";
import { useAuthStore, useUserStore } from "#src/store";

import { Alert, Button, Card, Typography } from "antd";
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

export default function ButtonControl() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { hasAccessByCodes, hasAccessByRoles } = useAccess();
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

	return (
		<BasicContent className="flex flex-col gap-4">
			<Alert message={t("access.buttonControl.alertMessage")} description={t("access.buttonControl.alertDescription")}></Alert>
			<Card
				title={(
					<>
						{t("access.buttonControl.currentRole")}
						&nbsp;&nbsp;
						<Typography.Text mark code>{userRoles}</Typography.Text>
					</>
				)}
			>
				<div className="flex gap-4">
					<Button type={roleButtonType(AccessControlRoles.admin)} onClick={() => changeAccount(AccessControlRoles.admin)}>
						{t("access.buttonControl.switchAdmin")}
					</Button>
					<Button type={roleButtonType(AccessControlRoles.common)} onClick={() => changeAccount(AccessControlRoles.common)}>
						{t("access.buttonControl.switchCommon")}
					</Button>
				</div>
			</Card>
			<Card title={t("access.buttonControl.componentControlPermissionCodes")}>
				<div className="flex items-center gap-4">
					<AccessControl codes={accessControlCodes.get}>
						<Typography.Text code>
							{accessControlCodes.get}
						</Typography.Text>
					</AccessControl>

					<AccessControl codes={accessControlCodes.update}>
						<Typography.Text code>
							{accessControlCodes.update}
						</Typography.Text>
					</AccessControl>

					<AccessControl codes={accessControlCodes.delete}>
						<Typography.Text code>
							{accessControlCodes.delete}
						</Typography.Text>
					</AccessControl>

					<AccessControl codes={accessControlCodes.add}>
						<Typography.Text code>
							{accessControlCodes.add}
						</Typography.Text>
					</AccessControl>
				</div>
			</Card>
			<Card title={t("access.buttonControl.componentControlRoles")}>
				<div className="flex items-center gap-4">
					<AccessControl type="role" codes={[AccessControlRoles.admin, AccessControlRoles.common]}>
						<Typography.Text code>
							{t("access.adminVisible.title")}
							&nbsp;&&nbsp;
							{t("access.commonVisible.title")}
						</Typography.Text>
					</AccessControl>

					<AccessControl type="role" codes={AccessControlRoles.admin}>
						<Typography.Text code>
							{t("access.adminVisible.title")}
						</Typography.Text>
					</AccessControl>

					<AccessControl type="role" codes={AccessControlRoles.common}>
						<Typography.Text code>
							{t("access.commonVisible.title")}
						</Typography.Text>
					</AccessControl>
				</div>
			</Card>
			<Card title={t("access.buttonControl.functionControlPermissionCodes")}>
				<div className="flex items-center gap-4">
					{
						hasAccessByCodes(accessControlCodes.get) && (
							<Typography.Text code>
								{accessControlCodes.get}
							</Typography.Text>
						)
					}

					{
						hasAccessByCodes(accessControlCodes.update) && (
							<Typography.Text code>
								{accessControlCodes.update}
							</Typography.Text>
						)
					}

					{
						hasAccessByCodes(accessControlCodes.delete) && (
							<Typography.Text code>
								{accessControlCodes.delete}
							</Typography.Text>
						)
					}

					{
						hasAccessByCodes([accessControlCodes.add]) && (
							<Typography.Text code>
								{accessControlCodes.add}
							</Typography.Text>
						)
					}

				</div>
			</Card>
			<Card title={t("access.buttonControl.functionControlRoles")}>
				<div className="flex items-center gap-4">
					{
						hasAccessByRoles([AccessControlRoles.admin, AccessControlRoles.common]) && (
							<Typography.Text code>
								{t("access.adminVisible.title")}
								&nbsp;&&nbsp;
								{t("access.commonVisible.title")}
							</Typography.Text>
						)
					}
					{
						hasAccessByRoles([AccessControlRoles.admin]) && (
							<Typography.Text code>
								{t("access.adminVisible.title")}
							</Typography.Text>
						)
					}
					{
						hasAccessByRoles(AccessControlRoles.common) && (
							<Typography.Text code>
								{t("access.commonVisible.title")}
							</Typography.Text>
						)
					}
				</div>
			</Card>
		</BasicContent>
	);
}
