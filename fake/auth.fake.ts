import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { ADMIN_REFRESH_TOKEN, ADMIN_TOKEN, COMMON_REFRESH_TOKEN, COMMON_TOKEN, COUNTRIES_CODE } from "./constants";
import { resultSuccess } from "./utils";

export default defineFakeRoute([
	{
		url: "/login",
		timeout: 0,
		method: "post",
		// statusCode: 401,
		// response: () => ({ code: 401, message: "Unauthorized" }),
		// statusCode: 400,
		// response: () => ({ code: 404, message: "Not found" }),
		response: ({ body }) => {
			if (body.username !== "common") {
				return resultSuccess({
					token: ADMIN_TOKEN,
					refreshToken: ADMIN_REFRESH_TOKEN,
				});
			}
			else {
				return resultSuccess({
					token: COMMON_TOKEN,
					refreshToken: COMMON_REFRESH_TOKEN,
				});
			}
		},
	},
	{
		url: "/logout",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({}),
	},
	{
		url: "/refresh-token",
		timeout: 1000,
		method: "post",
		response: ({ body }) => {
			if (body.refreshToken === ADMIN_REFRESH_TOKEN) {
				return resultSuccess({ token: ADMIN_TOKEN, refreshToken: ADMIN_REFRESH_TOKEN });
			}
			return resultSuccess({ token: COMMON_TOKEN, refreshToken: COMMON_REFRESH_TOKEN });
		},
	},
	{
		url: "/country-calling-codes",
		timeout: 1000,
		method: "get",
		response: () => {
			return resultSuccess(COUNTRIES_CODE);
		},
	},
]);
