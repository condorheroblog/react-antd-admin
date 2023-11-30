import { ConfigProvider, theme as antdTheme } from "antd";
import dayjs from "dayjs";
import { RouterProvider } from "react-router-dom";
import { useEffect, useCallback, Suspense } from "react";
import "./index.css";
import "dayjs/locale/zh-cn";
import { useTranslation } from "react-i18next";

import { router } from "./router";

import { useAppSelector, useAppDispatch, globalSlice } from "#src/store";
import { GlobalSpin, JSSThemeProvider } from "#src/components";
import { ANT_DESIGN_LOCALE } from "#src/locales";
import type { LanguageType } from "#src/locales";

export default function App() {
	const { i18n } = useTranslation();
	const lng = useAppSelector((state) => state.user.lng) as LanguageType;
	const theme = useAppSelector((state) => state.global.theme);
	const dispatch = useAppDispatch();

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

	const setTheme = useCallback(
		(dark = true, isWriteLocalStorage = false) => {
			dispatch(
				globalSlice.actions.changeSiteTheme({
					theme: dark ? "dark" : "light",
					isWriteLocalStorage,
				}),
			);
		},
		[dispatch, globalSlice.actions.changeSiteTheme],
	);

	const resize = useCallback(() => {
		const rect = document.body.getBoundingClientRect();
		const isMobile = rect.width < 960;
		dispatch(globalSlice.actions.changeWindowSize(isMobile));
	}, [dispatch]);

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
