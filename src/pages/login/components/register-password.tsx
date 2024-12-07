import { BasicButton } from "#src/components";
import { PASSWORD_RULES, USERNAME_RULES } from "#src/constants";

import {
	Button,
	Checkbox,
	Form,
	Input,
	Space,
	Typography,
} from "antd";
import { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Link } from "react-router";
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

				<Form.Item
					name="confirm"
					label={t("authority.confirmPassword")}
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: t("form.confirmPassword.required"),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error(t("form.confirmPassword.invalid")));
							},
						}),
					]}
				>
					<Input.Password placeholder={t("form.confirmPassword.required")} />
				</Form.Item>

				<Form.Item
					rules={[
						() => ({
							validator(_, value) {
								return value !== true ? Promise.reject(new Error(t("form.agree.required"))) : Promise.resolve();
							},
						}),
					]}
					name="termsAgreement"
					valuePropName="checked"
				>
					<Checkbox>
						<div className="flex flex-wrap text-xs">
							<Trans
								i18nKey="authority.agree"
								components={[
									<Link key={0} to="/terms-of-service" target="_blank" />,
									<Link key={1} to="/privacy-policy" target="_blank" />,
								]}
							/>
						</div>
					</Checkbox>
				</Form.Item>

				<Form.Item>
					<Button block type="primary" htmlType="submit" loading={loading}>
						{t("authority.register")}
					</Button>
				</Form.Item>

				<div className="text-sm text-center">
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
