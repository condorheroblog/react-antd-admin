import type { FormComponentMapType } from "./form-mode-context";
// import hero from "#src/assets/svg/hero.svg?url";
import Banner from "#src/assets/svg/banner.svg?react";
import logo from "#src/assets/svg/logo.svg?url";
import { useLayoutMenu } from "#src/hooks";
import { LayoutFooter } from "#src/layout";
import { LanguageButton } from "#src/layout/layout-header/components/language-button";
import { ThemeButton } from "#src/layout/layout-header/components/theme-button";

import {
	Col,
	Grid,
	Row,
	theme,
} from "antd";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FORM_COMPONENT_MAP, FormModeContext } from "./form-mode-context";

export default function Login() {
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const screens = Grid.useBreakpoint();
	const [formMode, setFormMode] = useState<FormComponentMapType>("login");
	const { pageLayout, layoutButtonTrigger } = useLayoutMenu();
	const isALignLeft = useMemo(() => pageLayout === "layout-left", [pageLayout]);
	const isAlignCenter = useMemo(() => pageLayout === "layout-center", [pageLayout]);

	const providedValue = useMemo(() => ({ formMode, setFormMode }), [formMode, setFormMode]);
	return (
		<div
			style={{
				backgroundColor: token.colorBgContainer,
			}}
		>
			<header className="z-10 absolute flex items-center right-3 top-3 left-3">
				<div
					className="text-colorText flex flex-1 items-center"
				>
					<img alt="App Logo" src={logo} className="mr-2 w-11" />
					<h1 className="m-0 text-xl font-medium">
						{import.meta.env.VITE_GLOB_APP_TITLE}
					</h1>
				</div>
				<div className="flex items-center">
					{layoutButtonTrigger}
					<ThemeButton />
					<LanguageButton className="px-2" />
				</div>
			</header>
			<div
				className="flex items-center overflow-hidden h-full"
			>
				<Row
					className={clsx("h-screen w-full", { "flex-row-reverse": isALignLeft },
					)}
				>
					<Col
						xs={0}
						sm={0}
						lg={15}
						style={{
							backgroundImage: `radial-gradient(${token.colorBgContainer}, ${token.colorPrimaryBg})`,
						}}
						className={clsx({ hidden: isAlignCenter })}
					>
						<div className="flex flex-col items-center justify-center h-full gap-3">
							<Banner
								className="h-64 motion-safe:animate-bounceInDownOutUp"
							/>
							<div className="text-xl text-colorTextSecondary mt-6 font-sans lg:text-2xl">
								{t("authority.pageTitle")}
							</div>
							<div className="text-colorTextTertiary mt-2">
								{t("authority.pageDescription")}
							</div>
						</div>
					</Col>

					<Col
						xs={24}
						sm={24}
						lg={isAlignCenter ? 24 : 9}
						className="relative flex flex-col justify-center px-6 py-10 xl:px-8"
						style={isAlignCenter || (!screens.xl && !screens.xxl && !screens.lg)
							? {
								backgroundImage: `radial-gradient(${token.colorBgContainer}, ${token.colorPrimaryBg})`,
							}
							: {}}
					>
						<LayoutFooter className="w-full absolute bottom-3 left-1/2 -translate-x-1/2" />
						<div className="w-full sm:mx-auto md:max-w-md">
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
					</Col>
				</Row>
			</div>
		</div>
	);
}
