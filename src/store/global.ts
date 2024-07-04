import { create } from "zustand";

import { isMobile } from "#src/utils";

export type ThemeType = "dark" | "light" | null;

const initialState = {
	globalSpin: false,
	theme: localStorage.getItem("theme") as ThemeType,
	isMobile: isMobile(),
};

type GlobalState = typeof initialState;

interface GlobalAction {
	openGlobalSpin: () => void
	closeGlobalSpin: () => void
	changeSiteTheme: (payload: {
		theme: ThemeType
		isWriteLocalStorage?: boolean
	}) => void
	changeWindowSize: (payload: boolean) => void
};

export const useGlobalStore = create<GlobalState & GlobalAction>(set => ({
	...initialState,

	openGlobalSpin: () => {
		return set({
			globalSpin: true,
		});
	},

	closeGlobalSpin: () => {
		return set({
			globalSpin: false,
		});
	},

	changeSiteTheme: (
		payload,
	) => {
		if (payload.isWriteLocalStorage) {
			window.localStorage.setItem("theme", payload.theme ?? "");
		}
		return set({
			theme: payload.theme,
		});
	},

	changeWindowSize: (payload) => {
		return set({
			isMobile: payload,
		});
	},

}));
