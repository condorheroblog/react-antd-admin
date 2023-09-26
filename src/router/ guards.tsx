import { useEffect, useCallback } from "react";
import { useNavigate, useMatches, useLocation } from "react-router-dom";
import { ParentLayout } from "#src/layout";
import { useAppSelector, useAppDispatch } from "#src/store";
import { userInfoThunk } from "#src/store/slices/user";

export function RouterGuards() {
	const location = useLocation();
	const matches = useMatches();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userId = useAppSelector(
		(state) => state.user.userId,
	);

	const guardLogic = useCallback(async () => {
		if (location.pathname !== "/login") {
			const token = window.localStorage.getItem("token");
			if (!token) {
				navigate("/login", { replace: true });
			} else {
				if (matches.length === 1 && matches[0].pathname === "/") {
					navigate(import.meta.env.VITE_BASE_HOME_PATH, { replace: true });
				}
				if (!userId) {
					await dispatch(userInfoThunk());
				}
			}
		}
	}, [matches, location, userId]);

	useEffect(() => {
		guardLogic();
	}, [matches, location, userId]);

	return <ParentLayout />;
}
