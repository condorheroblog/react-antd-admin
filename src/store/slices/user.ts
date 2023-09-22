import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchLogin } from "#src/api/user";
import type { FormInitialValues } from "#src/pages/login";

export const authLogin = createAsyncThunk("auth/login", async (loginPayload: FormInitialValues) => {
	const response = await fetchLogin(loginPayload);
	const { token } = response.result;
	window.localStorage.setItem("token", token);
	return token;
});

export const userSlice = createSlice({
	name: "user",
	initialState: { token: window.localStorage.getItem("token") },
	reducers: { },
	extraReducers: (builder) => {
		builder.addCase(authLogin.fulfilled, (state, action) => {
			state.token = action.payload;
		});
	},
});

export default userSlice;
