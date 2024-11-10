import type { AuthType } from "#src/api/user/types";
import type { PasswordLoginFormType } from "#src/pages/login/components/password-login";
import { fetchLogin, fetchLogout } from "#src/api/user";
import { usePermissionStore, useTabsStore, useUserStore } from "#src/store";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
	token: "",
	refreshToken: "",
};

type AuthState = AuthType;

interface AuthAction {
	login: (loginPayload: PasswordLoginFormType) => Promise<void>
	logout: () => Promise<void>
	reset: () => void
};

export const useAuthStore = create<AuthState & AuthAction>()(

	persist((set, get) => ({
		...initialState,

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
			 * 2. 清空 token
			 */

			get().reset();

			/**
			 * 3. 清空用户信息
			 * @see {@link https://github.com/pmndrs/zustand?tab=readme-ov-file#read-from-state-in-actions | Read from state in actions}
			 */
			useUserStore.getState().reset();

			/**
			 * 4. 清空权限信息
			 * @see https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
			 */
			usePermissionStore.getState().reset();

			/**
			 * 5. 清空标签页
			 */
			useTabsStore.getState().resetTabs();

			/**
			 * 6. 清空 keepAlive 缓存
			 * 在 container-layout 组件中，根据 openTabs 自动刷新 keepAlive 缓存
			 */
		},

		reset: () => {
			return set({
				...initialState,
			});
		},

	}), { name: "access-token" }),

);
