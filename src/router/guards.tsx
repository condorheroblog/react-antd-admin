import { useEffect, useCallback, isValidElement } from "react";
import { useNavigate, useMatches, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { whiteList } from "./index";

import { ParentLayout } from "#src/layout";
import { useAppSelector, useAppDispatch } from "#src/store";
import { rememberRoute } from "#src/utils";
import { userInfoThunk } from "#src/store/slices/user";

export function RouterGuards() {
	const location = useLocation();
	const matches = useMatches();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const hasFetchedUserInfo = useAppSelector(
		(state) => state.user.hasFetchedUserInfo,
	);
	const lng = useAppSelector((state) => state.user.lng);

	const updateDocumentTitle = useCallback(async () => {
		const currentRoute = matches[matches.length - 1];
		const documentTitle = currentRoute.handle?.title;
		const newTitle = (
			isValidElement(documentTitle)
				? t(documentTitle?.props.children)
				: documentTitle
		) as string;
		document.title = newTitle || document.title;
	}, [matches, lng]);

	const guardLogic = useCallback(async () => {
		const currentRoute = matches[matches.length - 1];
		// Normal page
		if (!whiteList.includes(currentRoute.pathname)) {
			// Do not use redux to prevent tokens from being deleted
			const hasTokenInLocal = window.localStorage.getItem("token");
			if (!hasTokenInLocal) {
				// Go to login page
				// Remember the route before exiting
				navigate(`/login?redirect=${location.pathname}${location.search}`, {
					replace: true,
				});
			} else {
				// Fetch user profile
				!hasFetchedUserInfo && (await dispatch(userInfoThunk()));

				// Redirect to home page
				if (matches.length === 1 && matches[0].pathname === "/") {
					navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
				}
			}
		}
	}, [matches, hasFetchedUserInfo, rememberRoute]);

	useEffect(() => {
		guardLogic();
	}, [matches, guardLogic]);

	useEffect(() => {
		updateDocumentTitle();
	}, [matches, lng, updateDocumentTitle]);

	return <ParentLayout />;
}
