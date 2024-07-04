import { ConfigProvider, theme as antdTheme } from "antd";
import dayjs from "dayjs";
import { RouterProvider } from "react-router-dom";
import { Suspense, useCallback, useEffect } from "react";
import "./index.css";
import "dayjs/locale/zh-cn";
import { useTranslation } from "react-i18next";

import { router } from "./router";

import { useGlobalStore, useUserStore } from "#src/store";
import { GlobalSpin, JSSThemeProvider } from "#src/components";
import { ANT_DESIGN_LOCALE } from "#src/locales";
import { useScrollToHash } from "#src/hooks";

export default function App() {
	const { i18n } = useTranslation();
	const { lng } = useUserStore();
	const { theme, changeWindowSize, changeSiteTheme } = useGlobalStore();

	useScrollToHash();

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
		i18n.changeLanguage(lng);
	}, [lng]);

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
	}, [setTheme]);

	// Mobile or desktop
	useEffect(() => {
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, [window, resize]);

	return (
		<ConfigProvider
			locale={getAntdLocale()}
			theme={{
				algorithm:
					theme === "dark"
						? antdTheme.darkAlgorithm
						: antdTheme.defaultAlgorithm,
			}}
		>
			<JSSThemeProvider>
				<GlobalSpin>
					<Suspense fallback={null}>
						<RouterProvider router={router} />
					</Suspense>
				</GlobalSpin>
			</JSSThemeProvider>
		</ConfigProvider>
	);
}
