import {
	Layout, Row, Col, Space, Form, Input, Button, Grid,
} from "antd";
import { createUseStyles } from "react-jss";

import { useAppDispatch } from "#src/store";
import frameworkTemplate from "#src/assets/images/framework-template.svg";
import logo from "#src/assets/images/logo.svg";
import { authLoginThunk } from "#src/store/slices/user";
import { Footer } from "#src/layout";

const useStyles = createUseStyles({
	loginWrapper: {
		width: "100%",
		height: "50vh",
		// minWidth: "23vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "#FFFFFF",
		borderRadius: "0.8em",
		border: "1px solid #F0F0F0",
		boxShadow: "0 0.2em 1em 0 rgba(0, 0, 0, 0.1), 0 1em 2.3em 0 rgba(0, 0, 0, 0.1)",
	},
	logo: {
		width: "6em",
		color: "#000000E0",
	},
	logoText: {
		fontSize: "1.8em",
		fontWeight: "bold",
	},
	template: {
		width: "30em",
	},
	hello: {
		fontSize: "1.8em",
		fontWeight: "bold",
	},
	loginLogoText: {
		fontSize: "1.8em",
		fontWeight: "bold",
		color: "rgb(0, 85, 0, .7)",
		marginBottom: "1em",
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
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)",
	},
	footer: {
		backgroundColor: "transparent",
		display: "flex",
		justifyContent: "center",
	},
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

	const handleFinish = async (values: FormInitialValues) => {
		await dispatch(authLoginThunk(values));
	};

	return (
		<Layout className={classes.section}>
			<Content className={classes.content}>
				<Row gutter={[{ xs: 0, sm: 0, lg: 120 }, 0]}>
					<Col xs={0} sm={0} lg={12}>
						<Space direction="vertical">
							<Space>
								<img src={logo} alt="logo" className={classes.logo} />
								<h1 className={classes.logoText}>React Antd Admin</h1>
							</Space>
							<img src={frameworkTemplate} alt="framework-template" className={classes.template} />
						</Space>
					</Col>

					<Col xs={24} sm={24} lg={12}>
						<div className={classes.loginWrapper} style={{ minWidth: !screens.lg ? "80vw" : "23vw" }}>
							<Space direction="vertical" style={{ minWidth: "80%" }}>
								<Space direction="vertical">
									<div className={classes.hello}>Hello, Welcome to</div>
									<Space className={classes.loginLogoText}>
										React Antd Admin
									</Space>
								</Space>

								<Form
									name="loginForm"
									form={loginForm}
									layout="vertical"
									initialValues={FORM_INITIAL_VALUES}
									onFinish={handleFinish}
								>
									<Form.Item
										label="Username"
										name="username"
										rules={[
											{
												required: true,
												message: "用户名不能为空",
											},
										]}
									>
										<Input />
									</Form.Item>

									<Form.Item
										label="Password"
										name="password"
										rules={[
											{
												required: true,
												message: "密码不能为空",
											},
										]}
									>
										<Input.Password />
									</Form.Item>

									<Form.Item>
										<Button
											block
											type="primary"
											htmlType="submit"
										>
											Login
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
