import type { UserResult } from "#src/api/user/types";
import type { FormInitialValues } from "#src/pages/login";
import { fetchLogin, fetchLogout } from "#src/api/user";
import { usePermissionStore, useTabsStore } from "#src/store";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
	userId: "",
	token: "",
	refreshToken: "",
	avatar: "",
	username: "",
	nickname: "",
	description: "",
	lng: "zh-CN",
	roles: [],
};

type UserState = UserResult;

interface UserAction {
	changeLanguage: (firstName: UserState["lng"]) => void
	login: (loginPayload: FormInitialValues) => Promise<void>
	logout: () => Promise<void>
	reset: () => void
};

export const useUserStore = create<UserState & UserAction>()(

	persist((set, get) => ({
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
			/**
			 * 1. 退出登录
			 */

			await fetchLogout();
			/**
			 * 2. 退出登录后，清空用户信息
			 * @see {@link https://github.com/pmndrs/zustand?tab=readme-ov-file#read-from-state-in-actions | Read from state in actions}
			 */

			get().reset();
			/**
			 * 3. 清空权限信息
			 * @see https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
			 */
			usePermissionStore.getState().reset();

			/**
			 * 4. 清空标签页
			 */
			useTabsStore.getState().resetTabs();
		},

		reset: () => {
			return set({
				...initialState,
			});
		},

	}), { name: "user-info" }),

);
