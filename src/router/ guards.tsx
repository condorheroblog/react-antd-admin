import { useEffect, useCallback } from "react";
import { useNavigate, useMatches, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ParentLayout } from "#src/layout";
import { useAppSelector, useAppDispatch } from "#src/store";
import { i18nResources } from "#src/locales";
import { userInfoThunk } from "#src/store/slices/user";

export function RouterGuards() {
	const location = useLocation();
	const matches = useMatches();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector((state) => state.user.isLogin);
	const { i18n } = useTranslation();

	const guardLogic = useCallback(async () => {
		if (location.pathname !== "/login") {
			const token = window.localStorage.getItem("token");
			if (!token) {
				navigate("/login", { replace: true });
			} else {
				if (matches.length === 1 && matches[0].pathname === "/") {
					navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
				}
				if (!isLogin) {
					await dispatch(userInfoThunk());
				}
			}
		}
	}, [matches, location, isLogin]);

	useEffect(() => {
		guardLogic();
	}, [matches, location, isLogin]);

	useEffect(() => {
		const localLanguage = localStorage.getItem("lng");
		if (localLanguage && Object.keys(i18nResources).includes(localLanguage)) {
			i18n.changeLanguage(localLanguage);
		}
	}, []);

	return <ParentLayout />;
}
