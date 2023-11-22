import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import "./index.css";
import "dayjs/locale/zh-cn";
import { useTranslation } from "react-i18next";
import { router } from "./router";
import { useAppSelector } from "#src/store";
import { GlobalSpin } from "#src/components";
import { ANT_DESIGN_LOCALE } from "#src/locales";
import type { LanguageType } from "#src/locales";

export default function App() {
	const lng = useAppSelector((state) => state.user.lng) as LanguageType;
	const { i18n } = useTranslation();

	/**
	 * ant design internationalization
	 * @link https://ant.design/docs/react/i18n
	 */
	const getAntdLocale = () => {
		return ANT_DESIGN_LOCALE[lng];
	};

	/**
	 * day.js internationalization
	 * @link https://day.js.org/docs/en/installation/installation
	 */
	useEffect(() => {
		if (lng === "en") {
			dayjs.locale("en");
		} else if (lng === "zh-CN") {
			dayjs.locale("zh-cn");
		}
	}, [lng]);

	/**
	 * react-i18next internationalization
	 * @link https://www.i18next.com/overview/api#changelanguage
	 */
	useEffect(() => {
		i18n.changeLanguage(lng);
	}, [lng]);

	return (
		<ConfigProvider locale={getAntdLocale()}>
			<GlobalSpin>
				<RouterProvider router={router} />
			</GlobalSpin>
		</ConfigProvider>
	);
}
