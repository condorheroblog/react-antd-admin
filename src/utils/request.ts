import type { Options } from "ky";
import { fetchRefreshToken } from "#src/api/user";

import { useGlobalStore, useUserStore } from "#src/store";
import { message, rememberRoute } from "#src/utils";
import ky from "ky";
import { isObject } from "./is";

// Requests that do not require authentication.
const requestWhiteList = ["/login"];

const defaultConfig: Options = {
	// The input argument cannot start with a slash / when using prefixUrl option.
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	retry: {
		limit: 3,
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

				// If the response is not ok(not in the range 200-299), it means that there was an error.
				if (!response.ok) {
					if (!requestWhiteList.some(url => request.url.endsWith(url)) && response.status === 401) {
						// 防止刷新 refresh-token 继续接收到的 401 错误，出现死循环
						if (["/refresh-token"].some(url => request.url.endsWith(url))) {
							window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
							return response;
						}

						// If the token is expired, refresh it and try again.
						const { refreshToken } = useUserStore.getState();
						// If there is no refresh token, it means that the user has not logged in.
						if (!refreshToken) {
							window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
							return response;
						}

						const freshResponse = await fetchRefreshToken({
							refreshToken,
						});

						useUserStore.setState({
							token: freshResponse.result.token,
							refreshToken: freshResponse.result.refreshToken,
						});

						// Try again with the new token(options.hooks)
						return ky(request, options);
					}
					else {
						try {
							const data = await response.json();
							if (isObject(data)) {
								const json = data as { errorMsg?: string, message?: string };
								message.error(json.errorMsg || json.message || response.statusText);
							}
							else {
								message.error(response.statusText);
							}
							return response;
						}
						catch (e) {
							console.error("Error parsing JSON:", e);
							message.error(response.statusText);
							return response;
						}
					}
				}
			},
		],
	},
};

export const request = ky.create(defaultConfig);
