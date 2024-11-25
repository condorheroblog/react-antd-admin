import { AntdApp, JSSThemeProvider } from "#src/components";
import { usePreferences, useScrollToHash } from "#src/hooks";
import { AppVersionMonitor } from "#src/layout/widgets/version-monitor";
import { ANT_DESIGN_LOCALE } from "#src/locales";

import { theme as antdTheme, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { customAntdDarkTheme, customAntdLightTheme } from "./styles/antd-theme";
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
	const { language, isDark, theme, themeColorPrimary, colorBlindMode, colorGrayMode, themeRadius, changeSiteTheme } = usePreferences();

	useScrollToHash();

	/**
	 * ant design internationalization
	 * @link https://ant.design/docs/react/i18n
	 */
	const getAntdLocale = () => {
		return ANT_DESIGN_LOCALE[language];
	};

	/**
	 * day.js internationalization
	 * @link https://day.js.org/docs/en/installation/installation
	 */
	useEffect(() => {
		if (language === "en-US") {
			dayjs.locale("en");
		}
		else if (language === "zh-CN") {
			dayjs.locale("zh-cn");
		}
	}, [language]);

	/**
	 * react-i18next internationalization
	 * @link https://www.i18next.com/overview/api#changelanguage
	 */
	useEffect(() => {
		i18n.changeLanguage(language).then(() => {
			setReadyLanguage(true);
		});
	}, [language, i18n.changeLanguage, setReadyLanguage]);

	/**
	 * Change theme when the system theme changes
	 */
	const setEmulateTheme = useCallback(
		// eslint-disable-next-line unused-imports/no-unused-vars
		(dark?: boolean) => {
			changeSiteTheme("auto");
		},
		[changeSiteTheme],
	);

	/**
	 * Watch system theme change
	 */
	useEffect(() => {
		if (theme === "auto") {
			// https://developer.chrome.com/docs/devtools/rendering/emulate-css/
			const darkModeMediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)",
			);

			function matchMode(e: MediaQueryListEvent) {
				setEmulateTheme(e.matches);
			}

			setEmulateTheme(darkModeMediaQuery.matches);
			darkModeMediaQuery.addEventListener("change", matchMode);
			return () => {
				darkModeMediaQuery.removeEventListener("change", matchMode);
			};
		}
	}, [theme, setEmulateTheme]);

	/**
	 * 更新页面颜色模式（灰色、色弱）
	 */
	const updateColorMode = () => {
		const dom = document.documentElement;
		const COLOR_BLIND = "color-blind-mode";
		const COLOR_GRAY = "gray-mode";
		colorBlindMode
			? dom.classList.add(COLOR_BLIND)
			: dom.classList.remove(COLOR_BLIND);
		colorGrayMode
			? dom.classList.add(COLOR_GRAY)
			: dom.classList.remove(COLOR_GRAY);
	};

	useEffect(() => {
		updateColorMode();
	}, [colorBlindMode, colorGrayMode]);

	return (
		<ConfigProvider
			input={{ autoComplete: "off" }}
			locale={getAntdLocale()}
			theme={{
				cssVar: true,
				hashed: false,
				algorithm:
					isDark
						? antdTheme.darkAlgorithm
						: antdTheme.defaultAlgorithm,
				...(isDark ? customAntdDarkTheme : customAntdLightTheme),
				token: {
					...(isDark ? customAntdDarkTheme.token : customAntdLightTheme.token),
					borderRadius: themeRadius,
					colorPrimary: themeColorPrimary,
				},
			}}
		>
			<AntdApp>
				<JSSThemeProvider>
					<Suspense fallback={null}>
						{import.meta.env.VITE_APP_VERSION_MONITOR === "Y" ? <AppVersionMonitor /> : null}
						{isReadyLanguage ? <RouterProvider router={router} /> : null}
					</Suspense>
				</JSSThemeProvider>
			</AntdApp>
		</ConfigProvider>
	);
}
