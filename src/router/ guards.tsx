import { Navigate, Outlet } from "react-router-dom";

export function createRouterGuards() {
	const token = "YOUR TOKEN VALUE";
	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
}
