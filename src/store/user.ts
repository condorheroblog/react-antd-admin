import type { FormInitialValues } from "#src/pages/login";
import { fetchLogin, fetchLogout } from "#src/api/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
	roles: [],
};

type UserState = typeof initialState;

interface UserAction {
	changeLanguage: (firstName: UserState["lng"]) => void
	login: (loginPayload: FormInitialValues) => Promise<void>
	logout: () => Promise<void>
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
			return set({
				...response.result,
			});
		},

		logout: async () => {
			await fetchLogout();
			return set({
				...initialState,
			});
		},

	}), { name: "user-info" }),

);
