import type { LanguageType } from "#src/locales";
import { AntdApp, JSSThemeProvider } from "#src/components";
import { useScrollToHash } from "#src/hooks";
import { ANT_DESIGN_LOCALE } from "#src/locales";
import { useGlobalStore, useUserStore } from "#src/store";
import { theme as antdTheme, ConfigProvider } from "antd";

import dayjs from "dayjs";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { customAntdDarkTheme, customAntdLightTheme } from "./styles/antdTheme";
import "dayjs/locale/zh-cn";

export default function App() {
	const { i18n } = useTranslation();
	/**
	 * When the language set on initial system entry is not the default language,
	 * it is necessary to wait for the i18n initialization to complete. Otherwise, the route titles will display the default language.
	 * This is because t.tsx will execute first, while the i18n initialization takes time.
	 * 初次进入系统的语言不是默认语言时，需要等待 i18n 初始化完成，否则路由标题会显示默认语言。
	 * 这是因为 t.tsx 会先执行，而 i18n 初始化需要时间。
	 */
	const [isReadyLanguage, setReadyLanguage] = useState(false);
	const { lng } = useUserStore();
	const { theme, isDark, changeWindowSize, changeSiteTheme } = useGlobalStore();

	useScrollToHash();

	/**
	 * ant design internationalization
	 * @link https://ant.design/docs/react/i18n
	 */
	const getAntdLocale = () => {
		return ANT_DESIGN_LOCALE[lng as LanguageType];
	};

	/**
	 * day.js internationalization
	 * @link https://day.js.org/docs/en/installation/installation
	 */
	useEffect(() => {
		if (lng === "en-US") {
			dayjs.locale("en");
		}
		else if (lng === "zh-CN") {
			dayjs.locale("zh-cn");
		}
	}, [lng]);

	/**
	 * react-i18next internationalization
	 * @link https://www.i18next.com/overview/api#changelanguage
	 */
	useEffect(() => {
		i18n.changeLanguage(lng).then(() => {
			setReadyLanguage(true);
		});
	}, [lng, i18n.changeLanguage, setReadyLanguage]);

	const setTheme = useCallback(
		(dark = true, isWriteLocalStorage = false) => {
			changeSiteTheme({
				theme: dark ? "dark" : "light",
				isWriteLocalStorage,
			});
		},
		[changeSiteTheme],
	);

	const resize = useCallback(() => {
		const rect = document.body.getBoundingClientRect();
		const isMobile = rect.width < 960;
		changeWindowSize(isMobile);
	}, [changeWindowSize]);

	useEffect(() => {
		// Watch system theme change
		if (!theme) {
			// https://developer.chrome.com/docs/devtools/rendering/emulate-css/
			const darkModeMediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)",
			);

			function matchMode(e: MediaQueryListEvent) {
				setTheme(e.matches);
			}

			setTheme(darkModeMediaQuery.matches);
			darkModeMediaQuery.addEventListener("change", matchMode);
			return () => {
				darkModeMediaQuery.removeEventListener("change", matchMode);
			};
		}
	}, [theme, setTheme]);

	// Mobile or desktop
	useEffect(() => {
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, [window, resize]);

	return (
		<ConfigProvider
			input={{ autoComplete: "off" }}
			locale={getAntdLocale()}
			theme={{
				algorithm:
					isDark
						? antdTheme.darkAlgorithm
						: antdTheme.defaultAlgorithm,
				...(isDark ? customAntdDarkTheme : customAntdLightTheme),
			}}
		>
			<AntdApp>
				<JSSThemeProvider>
					<Suspense fallback={null}>
						{isReadyLanguage ? <RouterProvider router={router} /> : null}
					</Suspense>
				</JSSThemeProvider>
			</AntdApp>
		</ConfigProvider>
	);
}
