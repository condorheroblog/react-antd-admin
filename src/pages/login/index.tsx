import { useEffect } from "react";
import type { GlobalToken } from "antd";
import {
	Layout,
	Row,
	Col,
	Space,
	Form,
	Input,
	Button,
	Grid,
	Typography,
} from "antd";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "#src/store";
import frameworkTemplate from "#src/assets/images/framework-template.svg";
import logo from "#src/assets/images/logo.svg";
import { authLoginThunk } from "#src/store/slices/user";
import { Footer } from "#src/layout";

const { Title } = Typography;

const useStyles = createUseStyles((theme: GlobalToken) => {
	return {
		loginWrapper: {
			width: "100%",
			height: "max(50vh, 400px)",
			// minWidth: "23vw",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.colorBgContainer,
			borderRadius: "0.8em",
			border: `1px solid ${theme.colorBorderSecondary}`,
			boxShadow: theme.boxShadow,
		},
		helloText: {},
		logo: {
			width: "6em",
		},
		logoText: {
			fontSize: "1.8em !important",
		},
		template: {
			width: "30em",
		},
		content: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		section: {
			height: "100%",
			display: "flex",
			flexDirection: "column",
			backgroundImage: () => {
				return `radial-gradient(${theme.colorBgContainer}, ${theme.colorPrimaryBg})`;
			},
		},
		footer: {
			backgroundColor: "transparent",
			display: "flex",
			justifyContent: "center",
		},
	};
});

const { Content } = Layout;
const { useBreakpoint } = Grid;
const FORM_INITIAL_VALUES = {
	username: "admin",
	password: "password",
};
export type FormInitialValues = typeof FORM_INITIAL_VALUES;

export default function Login() {
	const classes = useStyles();
	const [loginForm] = Form.useForm();
	const screens = useBreakpoint();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const handleFinish = async (values: FormInitialValues) => {
		await dispatch(authLoginThunk(values));
	};

	useEffect(() => {
		document.title = t("global.common.login");
	}, []);

	return (
		<Layout className={classes.section}>
			<Content className={classes.content}>
				<Row gutter={[{ xs: 0, sm: 0, lg: 120 }, 0]}>
					<Col xs={0} sm={0} lg={12}>
						<Space direction="vertical">
							<Space>
								<img src={logo} alt="logo" className={classes.logo} />
								<Title level={1} className={classes.logoText}>
									React Antd Admin
								</Title>
							</Space>
							<img
								src={frameworkTemplate}
								alt="framework-template"
								className={classes.template}
							/>
						</Space>
					</Col>

					<Col xs={24} sm={24} lg={12}>
						<div
							className={classes.loginWrapper}
							style={{ minWidth: !screens.lg ? "70vw" : "20vw" }}
						>
							<Space direction="vertical" style={{ minWidth: "80%" }}>
								<Space direction="vertical">
									<Title level={3} className={classes.helloText}>
										Hello, Welcome to
									</Title>
									<Title style={{ marginTop: 0 }} level={5}>
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
										label={t("global.common.username")}
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
										label={t("global.common.password")}
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
											{t("global.common.login")}
										</Button>
									</Form.Item>
								</Form>
							</Space>
						</div>
					</Col>
				</Row>
			</Content>
			<Footer />
		</Layout>
	);
}
