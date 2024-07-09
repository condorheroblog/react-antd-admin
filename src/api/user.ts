import type { FormInitialValues } from "#src/pages/login";
import { request } from "#src/utils";

export interface UserInfo {
	userId: string
	avatar: string
	username: string
	nickname: string
	email: string
	phone: string
	description: string
}

export interface UserResult extends UserInfo {
	roles: Array<string>
	token: string
	refreshToken: string
}

export function fetchLogin(data: FormInitialValues) {
	return request
		.post("login", { json: data })
		.json<ApiResponse<UserResult>>();
}

export function fetchLogout() {
	return request.post("logout").json();
}

export interface UserInfoType {
	userId: string
	username: string
	nickname: string
	avatar: string
	desc: string
	password: string
	permissions?: {
		label: string
		value: string
	}[]
}

export function fetchUserInfo() {
	return request.get("userinfo").json<ApiResponse<UserInfoType>>();
}
