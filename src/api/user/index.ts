import type { AppRouteRecordRaw } from "#src/router/types";
import type { AuthType, LoginInfo, UserInfoType } from "./types";

import { request } from "#src/utils/request";
import { REFRESH_TOKEN_PATH } from "#src/utils/request/constants";

export * from "./types";

export function fetchLogin(data: LoginInfo) {
	return request
		.post("login", { json: data })
		.json<ApiResponse<AuthType>>();
}

export function fetchLogout() {
	return request.post("logout").json();
}

export function fetchAsyncRoutes() {
	return request.get("get-async-routes").json<ApiResponse<AppRouteRecordRaw[]>>();
}

export function fetchUserInfo() {
	return request.get("user-info").json<ApiResponse<UserInfoType>>();
}

export interface RefreshTokenResult {
	token: string
	refreshToken: string
}

export function fetchRefreshToken(data: { readonly refreshToken: string }) {
	return request.post(REFRESH_TOKEN_PATH, { json: data }).json<ApiResponse<RefreshTokenResult>>();
}
