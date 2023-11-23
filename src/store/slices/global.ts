import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
	name: "global",
	initialState: { globalSpin: false, theme: "light" },
	reducers: {
		openGlobalSpin(state) {
			state.globalSpin = true;
		},
		closeGlobalSpin(state) {
			state.globalSpin = false;
		},
		changeSiteTheme(state, action) {
			state.theme = action.payload.theme;
		},
	},
});
