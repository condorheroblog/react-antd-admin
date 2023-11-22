import type { FormInitialValues } from "#src/pages/login";
import { request } from "#src/utils";

export interface LoginResponseType {
	token: string;
}

export function fetchLogin(data: FormInitialValues) {
	return request
		.post("login", { json: data })
		.json<ApiResponse<LoginResponseType>>();
}

export function fetchLogout() {
	return request.post("logout").json();
}

export interface UserInfoType {
	userId: string;
	username: string;
	realName: string;
	avatar: string;
	desc: string;
	password: string;
	permissions?: {
		label: string;
		value: string;
	}[];
}

export function fetchUserInfo() {
	return request.get("userinfo").json<ApiResponse<UserInfoType>>();
}
