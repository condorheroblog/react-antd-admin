import { faker } from "@faker-js/faker/locale/zh_CN";
import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "./utils";

const token = faker.string.uuid();
const refreshToken = faker.string.uuid();

export default defineFakeRoute([
	{
		url: "/login",
		timeout: 1000,
		method: "post",
		// statusCode: 401,
		// response: () => ({ code: 401, message: "Unauthorized" }),
		// statusCode: 400,
		// response: () => ({ code: 404, message: "Not found" }),
		response: ({ body }) => {
			if (body.username !== "commom") {
				return resultSuccess({
					userId: "1",
					avatar: "https://avatars.githubusercontent.com/u/47056890",
					username: "Admin",
					nickname: "Admin",
					description: "manager",
					roles: ["admin"],
					token,
					refreshToken,
				});
			}
			else {
				return resultSuccess({
					userId: "2",
					avatar: "https://avatars.githubusercontent.com/u/47056890",
					username: "Tom",
					nickname: "Tom",
					description: "employee",
					roles: ["common"],
					token,
					refreshToken,
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
		response: () => resultSuccess({ token, refreshToken }),
	},
]);
