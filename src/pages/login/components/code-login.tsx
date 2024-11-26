import { BasicButton } from "#src/components";
import { MOBILE_PHONE_RULES } from "#src/constants";

import { LeftOutlined } from "@ant-design/icons";
import { ProFormCaptcha } from "@ant-design/pro-components";
import {
	Button,
	Form,
	InputNumber,
	Space,
	Typography,
} from "antd";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { FormModeContext } from "../form-mode-context";

const { Title } = Typography;

const FORM_INITIAL_VALUES = {
	phoneNumber: "",
	captcha: "",
};
export type CodeLoginFormType = typeof FORM_INITIAL_VALUES;

export function CodeLogin() {
	const [loading, setLoading] = useState(false);
	const [codeLoginForm] = Form.useForm();
	const { t } = useTranslation();
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			window.$message?.success(t("common.success"));
		}, 1000);
	};

	return (
		<>
			<Space direction="vertical">
				<Title level={3}>
					{t("authority.codeLogin")}
				</Title>
			</Space>

			<Form
				name="codeLoginForm"
				form={codeLoginForm}
				layout="vertical"
				initialValues={FORM_INITIAL_VALUES}
				onFinish={handleFinish}
			>

				<Form.Item
					label={t("authority.mobile")}
					name="phoneNumber"
					rules={MOBILE_PHONE_RULES(t)}
				>
					<InputNumber controls={false} className="w-full" placeholder={t("form.mobile.required")} />
				</Form.Item>

				<ProFormCaptcha
					label={t("authority.code")}
					placeholder={t("form.code.required")}
					captchaTextRender={(timing, count) => {
						return timing ? t("authority.sendText", { second: count }) : t("authority.sendCode");
					}}
					// onGetCaptcha={(phone) => {
					onGetCaptcha={() => {
						// console.log("phoneNumber:", phone);
						window.$message?.success(t("common.success"));
						return Promise.resolve();
					}}
					// onTiming={(count) => {
					// 	console.log("timing:", count);
					// }}
					rules={[
						{
							required: true,
						},
					]}
					phoneName="phoneNumber"
					name="captcha"
				/>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						loading={loading}
					>
						{t("authority.login")}
					</Button>
				</Form.Item>

				<div className="text-sm text-center">
					<BasicButton
						type="link"
						icon={<LeftOutlined />}
						className="px-1"
						onPointerDown={() => {
							setFormMode("login");
						}}
					>
						{t("common.back")}
					</BasicButton>
				</div>
			</Form>
		</>
	);
}
