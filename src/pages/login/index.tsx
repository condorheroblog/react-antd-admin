import type { FormComponentMapType } from "./form-mode-context";
import hero from "#src/assets/svg/hero.svg?url";
import logo from "#src/assets/svg/logo.svg?url";
import { LayoutFooter } from "#src/layout";
import { LanguageButton } from "#src/layout/layout-header/components/language-button";
import { ThemeButton } from "#src/layout/layout-header/components/theme-button";

import {
	Col,
	Layout,
	Row,
	Space,
	Typography,
} from "antd";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { createUseStyles } from "react-jss";
import { FORM_COMPONENT_MAP, FormModeContext } from "./form-mode-context";

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
export default function Login() {
	const classes = useStyles();
	const [formMode, setFormMode] = useState<FormComponentMapType>("login");

	const providedValue = useMemo(() => ({ formMode, setFormMode }), [formMode, setFormMode]);
	return (
		<Layout className={classes.section}>
			<header className="absolute flex items-center scale-95 right-3 top-3">
				<ThemeButton size="large" />
				<LanguageButton size="large" className="px-[11px]" />
			</header>
			<Content className="flex items-center justify-center overflow-hidden">
				<Row gutter={[{ xs: 0, sm: 0, lg: 200 }, 0]}>
					<Col xs={0} sm={0} lg={12}>
						<div className="flex flex-col justify-center h-full gap-3">
							<Space>
								<img src={logo} alt="logo" className={classes.logo} />
								<Title level={1} ellipsis className="!text-sm">
									{import.meta.env.VITE_GLOB_APP_TITLE}
								</Title>
							</Space>
							<img
								width={500}
								src={hero}
								alt="hero"
							/>
						</div>
					</Col>

					<Col xs={24} sm={24} lg={12}>
						<div className={classes.loginWrapper}>
							<div className="w-4/5 my-10">
								<FormModeContext.Provider value={providedValue}>
									<AnimatePresence mode="wait" initial={false}>
										<motion.div
											key={formMode}
											initial={{ x: 30, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											{FORM_COMPONENT_MAP[formMode]}
										</motion.div>
									</AnimatePresence>
								</FormModeContext.Provider>
							</div>
						</div>
					</Col>
				</Row>
			</Content>
			<LayoutFooter />
		</Layout>
	);
}
