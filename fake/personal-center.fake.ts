import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "./utils";

export default defineFakeRoute([
	{
		url: "/upload",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess("https://avatar.vercel.sh/blur.svg?text=%F0%9F%91%8D"),
	},
]);
