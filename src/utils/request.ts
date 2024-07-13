import type { Options } from "ky";
import ky from "ky";
import { message, rememberRoute } from "#src/utils";

import { useGlobalStore, useUserStore } from "#src/store";
import { fetchRefreshToken } from "#src/api/user";

const defaultConfig: Options = {
	// The input argument cannot start with a slash / when using prefixUrl option.
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	retry: {
		limit: 0,
	},
	hooks: {
		beforeRequest: [
			(request) => {
				useGlobalStore.getState().openGlobalSpin();
				const { token } = useUserStore.getState();
				request.headers.set("Authorization", `Bearer ${token}`);
			},
		],
		afterResponse: [
			async (request, options, response) => {
				useGlobalStore.getState().closeGlobalSpin();
				if (!response.ok) {
					if (response.status === 401) {
						const { refreshToken } = useUserStore.getState();
						fetchRefreshToken({
							refreshToken,
						}).then(async (res) => {
							useUserStore.setState({
								token: res.result.token,
								refreshToken: res.result.refreshToken,
							});
						}).catch(() => {
							// Remember the route before exiting
							window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
						});
					}
					else {
						try {
							const json = await response.json();
							message.error(json.errorMsg || json.message || response.statusText);
						}
						catch (e) {
							message.error(response.statusText);
						}
					}
				}
			},
		],
	},
};

export const request = ky.create(defaultConfig);
