import { Navigate, useMatches } from "react-router-dom";
import { useAppSelector } from "#src/store";
import { GlobalSpin } from "#src/components";
import { ContainerLayout, ParentLayout } from "#src/layout";

export function createRouterGuards() {
	const matches = useMatches();
	const isMatchLogin = matches.some((match) => match.pathname === "/login");

	const token = useAppSelector(
		(state) => state.user.token,
	);

	if (isMatchLogin) {
		return <ParentLayout />;
	}

	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return <GlobalSpin><ContainerLayout /></GlobalSpin>;
}
