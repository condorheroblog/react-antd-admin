import { BasicButton } from "#src/components";
import { PASSWORD_RULE, USERNAME_RULE } from "#src/constants";
import { useAuthStore, usePermissionStore, useUserStore } from "#src/store";

import {
	Button,
	Form,
	Input,
	Space,
	Typography,
} from "antd";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FormModeContext } from "../form-mode-context";

const { Title } = Typography;

const FORM_INITIAL_VALUES = {
	username: "admin",
	password: "123456789admin",
};
export type PasswordLoginFormType = typeof FORM_INITIAL_VALUES;

export function PasswordLogin() {
	const [loading, setLoading] = useState(false);
	const [passwordLoginForm] = Form.useForm();
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const login = useAuthStore(state => state.login);
	const handleAsyncRoutes = usePermissionStore(state => state.handleAsyncRoutes);
	const getUserInfo = useUserStore(state => state.getUserInfo);
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async (values: PasswordLoginFormType) => {
		setLoading(true);
		/* 先登录 */
		await login(values);

		/* ================= 分割线 ================= */
		await Promise.all([
			/**
			 * getUserInfo 和 handleAsyncRoutes 逻辑应该出现在 routerBeforeEach 中
			 * 但是因为 routerBeforeEach 不支持 异步调用 所以临时放在登录逻辑中
			 */
			getUserInfo(),
			handleAsyncRoutes(),
		]).finally(() => setLoading(false));
		/* ================= 分割线 ================= */

		const redirect = searchParams.get("redirect");
		if (redirect) {
			navigate(`/${redirect.slice(1)}`);
		}
		else {
			navigate("/");
		}
	};

	return (
		<>
			<Space direction="vertical">
				<Title level={3}>
					Hello, Welcome to
				</Title>
				<Title className="mt-0" level={5}>
					{import.meta.env.VITE_GLOB_APP_TITLE}
				</Title>
			</Space>

			<Form
				name="passwordLoginForm"
				form={passwordLoginForm}
				layout="vertical"
				initialValues={FORM_INITIAL_VALUES}
				onFinish={handleFinish}
			>
				<Form.Item
					label={t("authority.username")}
					name="username"
					rules={[
						{
							required: true,
						},
						USERNAME_RULE,
					]}
				>
					<Input placeholder={t("authority.usernameTip")} />
				</Form.Item>

				<Form.Item
					label={t("authority.password")}
					name="password"
					rules={[
						{
							required: true,
						},
						PASSWORD_RULE,
					]}
				>
					<Input.Password placeholder={t("authority.passwordTip")} />
				</Form.Item>

				<Form.Item>
					<div className="mb-5 -mt-1 flex justify-between text-sm">
						<BasicButton
							type="link"
							className="p-0"
							onPointerDown={() => {
								setFormMode("codeLogin");
							}}
						>
							{t("authority.codeLogin")}
						</BasicButton>
						<BasicButton
							type="link"
							className="p-0"
							onPointerDown={() => {
								setFormMode("forgotPassword");
							}}
						>
							{t("authority.forgotPassword")}
						</BasicButton>
					</div>
					<Button block type="primary" htmlType="submit" loading={loading}>
						{t("authority.login")}
					</Button>
				</Form.Item>

				<div className="text-center text-sm">
					{t("authority.noAccountYet")}
					<BasicButton
						type="link"
						className="px-1"
						onPointerDown={() => {
							setFormMode("register");
						}}
					>
						{t("authority.goToRegister")}
					</BasicButton>
				</div>
			</Form>
		</>
	);
}
