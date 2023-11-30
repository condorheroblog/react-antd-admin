import { faker } from "@faker-js/faker";
import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "../utils";

const token = faker.string.uuid();

const adminInfo = {
	userId: "1",
	username: "admin",
	realName: "Admin",
	avatar:
		"https://p6-passport.byteacctimg.com/img/user-avatar/16981ccf6c67324125a416ddccee33cb~90x90.awebp",
	desc: "manager",
	password: "admin",
	permissions: [
		{
			label: "控制台",
			value: "dashboard",
		},
	],
};

export default defineFakeRoute([
	{
		url: "/api/login",
		timeout: 1000,
		method: "post",
		// statusCode: 401,
		// response: () => ({ code: 401, message: "Unauthorized" }),
		// statusCode: 400,
		// response: () => ({ code: 404, message: "Not found" }),
		response: () => resultSuccess({ token }),
	},
	{
		url: "/api/logout",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({}),
	},
	{
		url: "/api/userinfo",
		timeout: 1000,
		method: "get",
		response: () => resultSuccess(adminInfo),
	},
]);
