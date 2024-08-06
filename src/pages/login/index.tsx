import { useEffect } from "react";
import {
	Button,
	Col,
	Form,
	Input,
	Layout,
	Row,
	Space,
	Typography,
} from "antd";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import frameworkTemplate from "#src/assets/images/framework-template.svg";
import logo from "#src/assets/images/logo.svg";
import { useUserStore } from "#src/store";
import { Footer } from "#src/layout";

import { LanguageMenu } from "#src/layout/header/components/language-menu";
import { ThemeSwitch } from "#src/layout/header/components/theme-switch";

const { Title } = Typography;

const useStyles = createUseStyles(({ token }) => {
	return {
		loginWrapper: {
			display: "flex",
			minWidth: "300px",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			backgroundColor: token.colorBgContainer,
			borderRadius: "0.8em",
			border: `1px solid ${token.colorBorderSecondary}`,
			boxShadow: token.boxShadow,
		},
		logo: {
			width: "6em",
		},
		section: {
			height: "100%",
			display: "flex",
			flexDirection: "column",
			backgroundImage: () => {
				return `radial-gradient(${token.colorBgContainer}, ${token.colorPrimaryBg})`;
			},
		},
	};
});

const { Content } = Layout;
const FORM_INITIAL_VALUES = {
	username: "admin",
	password: "password",
};
export type FormInitialValues = typeof FORM_INITIAL_VALUES;

export default function Login() {
	const classes = useStyles();
	const [loginForm] = Form.useForm();
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const login = useUserStore(state => state.login);

	const handleFinish = async (values: FormInitialValues) => {
		await login(values);

		const redirect = searchParams.get("redirect");
		if (redirect) {
			navigate(`${import.meta.env.BASE_URL}${redirect.slice(1)}`);
		}
		else {
			navigate(`${import.meta.env.BASE_URL}`);
		}
	};

	useEffect(() => {
		document.title = t("common.login");
	}, []);

	return (
		<Layout className={classes.section}>
			<header className="flex gap-3 absolute right-3 top-3 scale-95">
				<ThemeSwitch />
				<LanguageMenu />
			</header>
			<Content className="flex justify-center items-center">
				<Row gutter={[{ xs: 0, sm: 0, lg: 200 }, 0]}>
					<Col xs={0} sm={0} lg={12}>
						<Space direction="vertical">
							<Space>
								<img src={logo} alt="logo" className={classes.logo} />
								<Title level={1} ellipsis={true} className="!text-sm">
									React Antd Admin
								</Title>
							</Space>
							<img
								src={frameworkTemplate}
								alt="framework-template"
							/>
						</Space>
					</Col>

					<Col xs={24} sm={24} lg={12}>
						<div className={classes.loginWrapper}>
							<div className="w-4/5 my-10">
								<Space direction="vertical">
									<Title level={3}>
										Hello, Welcome to
									</Title>
									<Title className="mt-0" level={5}>
										React Antd Admin
									</Title>
								</Space>

								<Form
									name="loginForm"
									form={loginForm}
									layout="vertical"
									initialValues={FORM_INITIAL_VALUES}
									onFinish={handleFinish}
								>
									<Form.Item
										label={t("common.username")}
										name="username"
										rules={[
											{
												required: true,
											},
										]}
									>
										<Input />
									</Form.Item>

									<Form.Item
										label={t("common.password")}
										name="password"
										rules={[
											{
												required: true,
											},
										]}
									>
										<Input.Password />
									</Form.Item>

									<Form.Item>
										<Button block type="primary" htmlType="submit">
											{t("common.login")}
										</Button>
									</Form.Item>
								</Form>
							</div>
						</div>
					</Col>
				</Row>
			</Content>
			<Footer />
		</Layout>
	);
}
