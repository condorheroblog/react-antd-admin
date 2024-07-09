import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchLogin, fetchLogout } from "#src/api/user";
import type { FormInitialValues } from "#src/pages/login";
import { i18nResources } from "#src/locales";
import type { LanguageType } from "#src/locales";

const initialState = {
	userId: "",
	token: "",
	refreshToken: "",
	avatar: "",
	username: "",
	nickname: "",
	email: "",
	phone: "",
	description: "",
	lng: "zh-CN",
};

type UserState = typeof initialState;

interface UserAction {
	changeLanguage: (firstName: UserState["lng"]) => void
	login: (loginPayload: FormInitialValues) => void
	logout: () => void
};

export const useUserStore = create<UserState & UserAction>()(

	persist(set => ({
		...initialState,

		changeLanguage: (payload) => {
			return set({
				lng: payload,
			});
		},
		login: async (loginPayload) => {
			const response = await fetchLogin(loginPayload);
			const searchParams = new URLSearchParams(window.location.search);
			const redirect = searchParams.get("redirect");
			if (redirect) {
				window.location.href = `${import.meta.env.BASE_URL}${redirect.slice(1)}`;
			}
			else {
				window.location.href = `${import.meta.env.BASE_URL}`;
			}
			return set({
				...response.result,
			});
		},

		logout: async () => {
			await fetchLogout();
			window.localStorage.removeItem("theme");
			window.location.href = `${import.meta.env.BASE_URL}login`;
			return set({
				...initialState,
			});
		},

	}), { name: "user-info" }),

);
