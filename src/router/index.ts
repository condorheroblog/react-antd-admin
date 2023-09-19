import { createBrowserRouter } from "react-router-dom";
import { login } from "../pages/login";

const router = createBrowserRouter([
	{
		Component: login,
		path: "/login"
	},
]);

export default router;
