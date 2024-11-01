import type { Options } from "ky";
import { LOGIN } from "#src/router/constants";

import { useUserStore } from "#src/store";
import ky from "ky";

import { APP_NAME_HEADER, AUTH_HEADER, LANG_HEADER } from "./constants";
import { handleErrorResponse } from "./error-response";
import { globalProgress } from "./global-progress";
import { goLogin } from "./go-login";
import { refreshTokenAndRetry } from "./refresh";

// 请求白名单
const requestWhiteList = ["/login"];

// 请求超时时间
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

const defaultConfig: Options = {
	// The input argument cannot start with a slash / when using prefixUrl option.
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	timeout: API_TIMEOUT,
	retry: {
		// 当请求失败时，最多重试次数
		limit: 3,
	},
	hooks: {
		beforeRequest: [
			(request, options) => {
				const ignoreLoading = options.ignoreLoading;
				if (!ignoreLoading) {
					globalProgress.start();
				}
				const { token } = useUserStore.getState();
				request.headers.set(AUTH_HEADER, `Bearer ${token}`);
				request.headers.set(LANG_HEADER, useUserStore.getState().lng);
				request.headers.set(APP_NAME_HEADER, "BoCarbonScope");
			},
		],
		afterResponse: [
			async (request, options, response) => {
				const ignoreLoading = options.ignoreLoading;
				if (!ignoreLoading) {
					globalProgress.done();
				}
				// 状态码 200-299 是成功的，其他都是失败的
				if (!response.ok) {
					if (!requestWhiteList.some(url => request.url.endsWith(url)) && response.status === 401) {
						// 防止刷新 refresh-token 继续接收到的 401 错误，出现死循环
						if (["/refresh-token"].some(url => request.url.endsWith(url))) {
							goLogin();
							return response;
						}
						// If the token is expired, refresh it and try again.
						const { refreshToken } = useUserStore.getState();
						// If there is no refresh token, it means that the user has not logged in.
						if (!refreshToken) {
							// 如果页面的路由已经重定向到登录页，则不用调转直接返回结果
							if (location.pathname === LOGIN) {
								return response;
							}
							else {
								goLogin();
								return response;
							}
						}

						return refreshTokenAndRetry(request, options, refreshToken);
					}
					else {
						return handleErrorResponse(response);
					}
				}
			},
		],
	},
};

export const request = ky.create(defaultConfig);
