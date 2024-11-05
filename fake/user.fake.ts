import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { ADMIN_TOKEN } from "./constants";
import { resultSuccess } from "./utils";

export default defineFakeRoute([
	{
		url: "/user-info",
		timeout: 1000,
		method: "get",
		response: ({ headers }) => {
			if (headers.authorization?.split?.(" ")?.[1] === ADMIN_TOKEN) {
				return resultSuccess({
					userId: 1,
					avatar: "https://avatars.githubusercontent.com/u/47056890",
					username: "Admin",
					email: "<EMAIL>",
					phoneNumber: "1234567890",
					description: "manager",
					roles: ["admin"],
				});
			}
			else {
				return resultSuccess({
					userId: 2,
					avatar: "https://avatar.vercel.sh/avatar.svg?text=Common",
					username: "Tom",
					email: "<EMAIL>",
					phoneNumber: "9876543210",
					description: "employee",
					roles: ["common"],
				});
			}
		},
	},
]);
