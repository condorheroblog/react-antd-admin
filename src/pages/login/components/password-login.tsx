import { BasicButton } from "#src/components";
import { PASSWORD_RULES, USERNAME_RULES } from "#src/constants";
import { useAuthStore } from "#src/store";

import {
	Button,
	Form,
	Input,
	message,
	Space,
} from "antd";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";

import { FormModeContext } from "../form-mode-context";

const FORM_INITIAL_VALUES = {
	username: "admin",
	password: "123456789admin",
};
export type PasswordLoginFormType = typeof FORM_INITIAL_VALUES;

export function PasswordLogin() {
	const [loading, setLoading] = useState(false);
	const [passwordLoginForm] = Form.useForm();
	const { t } = useTranslation();
	const [messageLoadingApi, contextLoadingHolder] = message.useMessage();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const login = useAuthStore(state => state.login);
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async (values: PasswordLoginFormType) => {
		setLoading(true);
		messageLoadingApi?.loading(t("authority.loginInProgress"), 0);

		login(values).then(() => {
			messageLoadingApi?.destroy();
			window.$message?.success(t("authority.loginSuccess"));
			const redirect = searchParams.get("redirect");
			if (redirect) {
				navigate(`/${redirect.slice(1)}`);
			}
			else {
				navigate(import.meta.env.VITE_BASE_HOME_PATH);
			}
		}).finally(() => {
			messageLoadingApi?.destroy();
			// Prevent multiple requests from being made by clicking the login button
			setTimeout(() => {
				window.$message?.destroy();
				setLoading(false);
			}, 1000);
		});
	};

	return (
		<>
			{contextLoadingHolder}
			<Space direction="vertical">
				<h2 className="text-colorText mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
					{t("authority.welcomeBack")}
					&nbsp;
					👏
				</h2>
				<p className="lg:text-base text-sm text-colorTextSecondary">
					{t("authority.loginDescription")}
				</p>
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
					rules={USERNAME_RULES(t)}
				>
					<Input placeholder={t("form.username.required")} />
				</Form.Item>

				<Form.Item
					label={t("authority.password")}
					name="password"
					rules={PASSWORD_RULES(t)}
				>
					<Input.Password placeholder={t("form.password.required")} />
				</Form.Item>

				<Form.Item>
					<div className="flex justify-between mb-5 -mt-1 text-sm">
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

				<div className="text-sm text-center">
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
