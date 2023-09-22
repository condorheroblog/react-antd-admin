import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
	name: "global",
	initialState: { globalSpin: false },
	reducers: {
		openGlobalSpin(state) {
			state.globalSpin = true;
		},
		closeGlobalSpin(state) {
			state.globalSpin = false;
		},
	},
});

export default globalSlice;
