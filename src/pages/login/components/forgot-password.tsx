import { BasicButton } from "#src/components";

import { LeftOutlined } from "@ant-design/icons";
import { useCountDown } from "ahooks";
import {
	Button,
	Form,
	Input,
	Space,
	Typography,
} from "antd";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormModeContext } from "../form-mode-context";

const { Title } = Typography;

const FORM_INITIAL_VALUES = {
	email: "",
};
export type ForgotPasswordFormType = typeof FORM_INITIAL_VALUES;

export function ForgotPassword() {
	const [targetDate, setTargetDate] = useState<number>(0);

	const [countdown] = useCountDown({
		targetDate,
		onEnd: () => {
			setTargetDate(0);
		},
	});

	const [loading, setLoading] = useState(false);
	const [forgotForm] = Form.useForm();
	const { t } = useTranslation();
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async () => {
		setLoading(true);
		setTargetDate(new Date().getTime() + 1000 * 30);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	return (
		<>
			<Space direction="vertical">
				<Title level={3}>
					{t("authority.forgotPassword")}
				</Title>
				<p className="text-xs opacity-80">
					{t("authority.forgotPasswordSubtitle")}
				</p>
			</Space>

			<Form
				name="forgotForm"
				form={forgotForm}
				layout="vertical"
				initialValues={FORM_INITIAL_VALUES}
				onFinish={handleFinish}
			>
				<Form.Item
					label={t("authority.email")}
					name="email"
					rules={[
						{
							required: true,
						},
						{
							type: "email",
							message: t("form.email.invalid"),
						},
					]}
				>
					<Input placeholder={t("form.email.required")} />
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						loading={loading}
						disabled={countdown > 0}
					>
						{countdown > 0
							? t("authority.retryAfterText", { count: Math.floor(countdown / 1000) })
							: t("authority.sendResetLink")}
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
