import { BasicButton } from "#src/components";
import { PASSWORD_RULES, USERNAME_RULES } from "#src/constants";
import { isDynamicRoutingEnabled, isSendRoutingRequest } from "#src/router/routes/config";
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
import { useNavigate, useSearchParams } from "react-router";

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
	const { handleAsyncRoutes, handleSyncRoutes } = usePermissionStore();
	const getUserInfo = useUserStore(state => state.getUserInfo);
	const { setFormMode } = useContext(FormModeContext);

	const handleFinish = async (values: PasswordLoginFormType) => {
		setLoading(true);

		try {
			/* 先登录 */
			await login(values);

			/* ================= 分割线 ================= */
			// 初始化一个空数组来存放 Promise 对象
			const promises = [];

			// 总是添加获取用户信息的 Promise
			promises.push(getUserInfo());

			// 如果启用了动态路由，则添加处理动态路由的 Promise
			if (isDynamicRoutingEnabled && isSendRoutingRequest) {
				promises.push(handleAsyncRoutes());
			}
			const results = await Promise.allSettled(
				/**
				 * getUserInfo 和 handleAsyncRoutes 逻辑应该出现在 routerBeforeEach 中
				 * 但是因为 routerBeforeEach 不支持 异步调用 所以临时放在登录逻辑中
				 */
				promises,
			);
			// 启用了动态路由且路由从用户接口中获取
			if (isDynamicRoutingEnabled && !isSendRoutingRequest) {
				await handleSyncRoutes();
			}
			/* ================= 分割线 ================= */

			const hasError = results.some(result => result.status === "rejected");
			// 网络请求失败，跳转到 500 页面
			if (hasError) {
				navigate("/error/500");
			}
			else {
				const redirect = searchParams.get("redirect");
				if (redirect) {
					navigate(`/${redirect.slice(1)}`);
				}
				else {
					navigate("/");
				}
			}
		}
		finally {
			setLoading(false);
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
