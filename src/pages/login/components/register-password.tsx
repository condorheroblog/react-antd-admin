import { BasicButton } from "#src/components";
import { PASSWORD_RULE, USERNAME_RULE } from "#src/constants";

import {
	Button,
	Form,
	Input,
	Space,
	Typography,
} from "antd";
import { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { FormModeContext } from "../form-mode-context";

const { Title } = Typography;

const FORM_INITIAL_VALUES = {
	username: "",
	password: "",
	confirmPassword: "",
};
export type RegisterPasswordFormType = typeof FORM_INITIAL_VALUES;

export function RegisterPassword() {
	const [loading] = useState(false);
	const [registerForm] = Form.useForm();
	const { t } = useTranslation();
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async () => {
		window.$message?.success("注册成功");
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
				name="registerForm"
				form={registerForm}
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

				<Form.Item
					name="confirm"
					label={t("authority.confirmPassword")}
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: t("authority.passwordTip"),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error(t("authority.confirmPasswordTip")));
							},
						}),
					]}
				>
					<Input.Password placeholder={t("authority.passwordTip")} />
				</Form.Item>

				<Form.Item>
					<div className="mb-5 -mt-1 flex flex-wrap text-sm">
						<Trans
							i18nKey="authority.agree"
							components={[
								<Link key={0} to="/terms-of-service" target="_blank" />,
								<Link key={1} to="/privacy-policy" target="_blank" />,
							]}
						/>

					</div>
					<Button block type="primary" htmlType="submit" loading={loading}>
						{t("authority.register")}
					</Button>
				</Form.Item>

				<div className="text-center text-sm">
					{t("authority.alreadyHaveAnAccount")}
					<BasicButton
						type="link"
						className="px-1"
						onPointerDown={() => {
							setFormMode("login");
						}}
					>
						{t("authority.goToLogin")}
					</BasicButton>
				</div>
			</Form>
		</>
	);
}
