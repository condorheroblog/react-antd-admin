import type { FormInitialValues } from "#src/pages/login";
import type { AppRouteRecordRaw } from "#src/router/types";
import type { AuthType, UserInfoType } from "./types";
import { request } from "#src/utils";

export function fetchLogin(data: FormInitialValues) {
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
	return request.post("refresh-token", { json: data }).json<ApiResponse<RefreshTokenResult>>();
}
