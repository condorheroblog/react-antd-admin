import { Navigate, useMatches } from "react-router-dom";
import { useAppSelector } from "#src/store";
import { ParentLayout } from "#src/layout";

export function RouterGuards() {
	const matches = useMatches();
	const token = useAppSelector(
		(state) => state.user.token,
	);

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	if (matches.length === 1 && matches[0].pathname === "/") {
		return <Navigate to={import.meta.env.VITE_BASE_HOME_PATH} replace />;
	}

	return <ParentLayout />;
}
