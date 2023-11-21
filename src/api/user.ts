import type { FormInitialValues } from "#src/pages/login";
import { request } from "#src/utils";

export interface FetchResponseType {
	code: number;
	message: string;
	type: string;
}

export interface LoginResponseType {
	token: string;
}
export function fetchLogin(data: FormInitialValues) {
	return request.url("/login").post(data) as Promise<
		Record<"result", LoginResponseType>
	>;
}

export function fetchLogout() {
	return request.url("/logout").post() as Promise<FetchResponseType>;
}

export interface UserinfoType {
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
	return request.url("/userinfo").get() as Promise<
		Record<"result", UserinfoType>
	>;
}
