import { Navigate } from "react-router-dom";
import { useAppSelector } from "#src/store";
import { ParentLayout } from "#src/layout";

export function createRouterGuards() {
	const token = useAppSelector(
		(state) => state.user.token,
	);

	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return <ParentLayout />;
}
