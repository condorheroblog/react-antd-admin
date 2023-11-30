import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { isMobile } from "#src/utils";

export type ThemeType = "dark" | "light" | null;

export const globalSlice = createSlice({
	name: "global",
	initialState: {
		globalSpin: false,
		theme: localStorage.getItem("theme") as ThemeType,
		isMobile: isMobile(),
	},
	reducers: {
		openGlobalSpin(state) {
			state.globalSpin = true;
		},
		closeGlobalSpin(state) {
			state.globalSpin = false;
		},
		changeSiteTheme(
			state,
			action: PayloadAction<{
				theme: ThemeType;
				isWriteLocalStorage?: boolean;
			}>,
		) {
			if (action.payload.isWriteLocalStorage) {
				window.localStorage.setItem("theme", action.payload.theme ?? "");
			}
			state.theme = action.payload.theme;
		},
		changeWindowSize(state, action: PayloadAction<boolean>) {
			state.isMobile = action.payload;
		},
	},
});
