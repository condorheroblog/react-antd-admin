

import { Layout, Row, Col, Space, Form, Input, Button } from "antd";
import { createUseStyles } from "react-jss"
import frameworkTemplate from "#src/assets/ images/framework-template.svg"
import logo from "#src/assets/ images/logo.svg"

const useStyles = createUseStyles({
	loginWrapper: {
		width: "100%",
		height: "35em",
		minWidth: "30em",
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
		height: "6em",
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
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)"
	},
	footer: {
		backgroundColor: "transparent",
		display: "flex",
		justifyContent: "center",
	}
})

const { Footer, Content } = Layout;

export function login (){
	const classes = useStyles();
	const [loginForm] = Form.useForm();

	return (

		<Layout className={classes.section}>
			<Content className={classes.content}>
				<Row gutter={[{ xs: 0, sm: 0, lg: 120 }, 0]}>
					<Col xs={0} sm={0} lg={12}>
						<Space direction="vertical">
							<Space>
								<img src={logo} alt="logo" className={classes.logo} />

								<span className={classes.logoText}>React Antd Admin</span>
							</Space>

							<img src={frameworkTemplate} alt="framework-template" className={classes.template} />
						</Space>
					</Col>

					<Col xs={24} sm={24} lg={12}>
						<div className={classes.loginWrapper}>
							<Space direction="vertical" style={{ minWidth: "23em" }}>
								<Space direction="vertical">
									<div className={classes.hello}>Hello, Welcome to</div>

									<div className={classes.loginLogoText}>React Antd Admin</div>
								</Space>

								<Form
									name="loginForm"
									form={loginForm}
									layout="vertical"
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
										style={{ maxWidth: "25em" }}
									>
										<Input   />
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
										<Input.Password   />
									</Form.Item>

									<Form.Item  >
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

			<Footer className={classes.footer}>Copyright &copy; 2023 Condor Hero All right reserved</Footer>
		</Layout>
	);
}
