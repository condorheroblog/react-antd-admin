import { create } from "zustand";
import { fetchLogin, fetchLogout, fetchUserInfo } from "#src/api/user";
import type { FormInitialValues } from "#src/pages/login";
import { i18nResources } from "#src/locales";
import type { LanguageType } from "#src/locales";

const CONSTANT_USERINFO = {
	hasFetchedUserInfo: false,
	userId: "",
	username: "",
	realName: "",
	avatar: "",
	desc: "",
	password: "",
};

const token = window.localStorage.getItem("token");
const lng = window.localStorage.getItem("lng") ?? "";

const initialState = {
	/**
	 * authLoginThunk
	 */
	token,
	hasFetchedToken: !!token,

	// ---------

	/**
	 * userInfoThunk
	 */
	...CONSTANT_USERINFO,
	// ignore illegality
	lng: (Object.keys(i18nResources).includes(lng) ? lng : "zh-CN") as LanguageType,
};

type UserState = typeof initialState;

interface UserAction {
	changeLanguage: (firstName: UserState["lng"]) => void
	login: (loginPayload: FormInitialValues) => void
	logout: () => void
	getUserInfo: () => void
};

export const useUserStore = create<UserState & UserAction>(set => ({
	...initialState,

	changeLanguage: (payload) => {
		return set({
			lng: payload,
		});
	},
	login: async (loginPayload) => {
		const response = await fetchLogin(loginPayload);
		const { token } = response.result;
		window.localStorage.setItem("token", token);
		const searchParams = new URLSearchParams(window.location.search);
		const redirect = searchParams.get("redirect");
		if (redirect) {
			window.location.href = `${import.meta.env.BASE_URL}${redirect.slice(1)}`;
		}
		else {
			window.location.href = `${import.meta.env.BASE_URL}`;
		}
		return set({
			token,
			hasFetchedToken: true,
		});
	},

	logout: async () => {
		await fetchLogout();
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("theme");
		window.localStorage.removeItem("lng");
		window.location.href = `${import.meta.env.BASE_URL}login`;
		return set({
			token: "",
			hasFetchedToken: false,
			...CONSTANT_USERINFO,
		});
	},

	getUserInfo: async () => {
		const response = await fetchUserInfo();
		return set({
			hasFetchedUserInfo: true,
			...response.result,
		});
	},
}));
