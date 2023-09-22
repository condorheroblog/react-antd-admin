import { Navigate, Outlet, useMatches } from "react-router-dom";
import { useAppSelector } from "#src/store";
import { GlobalSpin } from "#src/components";

export function createRouterGuards() {
	const matches = useMatches();
	const isMatchLogin = matches.some((match) => match.pathname === "/login");

	const token = useAppSelector(
		(state) => state.user.token,
	);

	if (!isMatchLogin && !token) {
		return <Navigate to="/login" replace />;
	}
	return <GlobalSpin><Outlet /></GlobalSpin>;
}
