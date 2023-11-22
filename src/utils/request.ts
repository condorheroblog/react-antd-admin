import type { Options } from "ky";
import ky from "ky";
import { message } from "antd";
import { store, globalSlice } from "#src/store";

const defaultConfig: Options = {
	// The input argument cannot start with a slash / when using prefixUrl option.
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
	},
	hooks: {
		beforeRequest: [
			(request) => {
				store.dispatch(globalSlice.actions.openGlobalSpin());
				const token =
					store.getState().user.token || window.localStorage.getItem("token");
				request.headers.set("Authorization", `Bearer ${token}`);
			},
		],
		afterResponse: [
			async (request, options, response) => {
				if (!response.ok) {
					if (response.status === 401) {
						// ?redirect=
						window.location.href = "/login";
					} else {
						const json = await response.json();
						message.error(json.message || response.statusText);
					}
				}
				store.dispatch(globalSlice.actions.closeGlobalSpin());
			},
		],
	},
};

export const request = ky.create(defaultConfig);
