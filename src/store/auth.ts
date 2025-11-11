import type { AuthType, LoginInfo } from "#src/api/user/types";

import { fetchLogin, fetchLogout } from "#src/api/user";
import { useAccessStore } from "#src/store/access";
import { useTabsStore } from "#src/store/tabs";
import { useUserStore } from "#src/store/user";
import { getAppNamespace } from "#src/utils/get-app-namespace";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
	token: "",
	refreshToken: "",
};

type AuthState = AuthType;

interface AuthAction {
	login: (loginPayload: LoginInfo) => Promise<void>
	logout: () => Promise<void>
	reset: () => void
};

export const useAuthStore = create<AuthState & AuthAction>()(

	persist((set, get) => ({
		...initialState,

		login: async (loginPayload) => {
			const response = await fetchLogin(loginPayload);
			set({
				...response.result,
			});
		},

		logout: async () => {
			/**
			 * 1. 退出登录
			 */

			await fetchLogout();
			/**
			 * 2. 清空 token 等其他信息
			 */

			get().reset();
		},

		reset: () => {
			/**
			 * 清空 token
			 */
			set({
				...initialState,
			});
			/**
			 * 清空用户信息
			 * @see {@link https://github.com/pmndrs/zustand?tab=readme-ov-file#read-from-state-in-actions | Read from state in actions}
			 */
			useUserStore.getState().reset();

			/**
			 * 清空权限信息
			 * @see https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
			 */
			useAccessStore.getState().reset();

			/**
			 * 清空标签页
			 */
			useTabsStore.getState().resetTabs();

			/**
			 * 清空 keepAlive 缓存
			 * 在 container-layout 组件中，根据 openTabs 自动刷新 keepAlive 缓存
			 */
		},

	}), { name: getAppNamespace("access-token") }),

);
