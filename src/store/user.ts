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
	roles: [],
};

type UserState = UserInfoType;

interface UserAction {
	getUserInfo: () => Promise<UserInfoType>
	reset: () => void
};

export const useUserStore = create<UserState & UserAction>()(

	set => ({
		...initialState,

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
