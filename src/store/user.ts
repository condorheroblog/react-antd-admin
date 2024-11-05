import type { UserInfoType } from "#src/api/user/types";
import { fetchUserInfo } from "#src/api/user";

import { create } from "zustand";

const initialState = {
	userId: "",
	avatar: "",
	username: "",
	email: "",
	phoneNumber: "",
	description: "",
	lng: "zh-CN",
	roles: [],
};

type UserState = UserInfoType;

interface UserAction {
	changeLanguage: (firstName: UserState["lng"]) => void
	getUserInfo: () => Promise<UserInfoType>
	reset: () => void
};

export const useUserStore = create<UserState & UserAction>()(

	set => ({
		...initialState,

		changeLanguage: (payload) => {
			return set({
				lng: payload,
			});
		},

		getUserInfo: async () => {
			const response = await fetchUserInfo();
			set({
				...response.result,
			});
			return response.result;
		},

		reset: () => {
			return set({
				...initialState,
			});
		},

	}),

);
