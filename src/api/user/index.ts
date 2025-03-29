import type { PasswordLoginFormType } from "#src/pages/login/components/password-login";
import type { AppRouteRecordRaw } from "#src/router/types";
import type { AuthType, UserInfoType } from "./types";
import { request } from "#src/utils";

export * from "./types";

export function fetchLogin(data: PasswordLoginFormType) {
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

export const refreshTokenPath = "refresh-token";
export function fetchRefreshToken(data: { readonly refreshToken: string }) {
	return request.post(refreshTokenPath, { json: data }).json<ApiResponse<RefreshTokenResult>>();
}
