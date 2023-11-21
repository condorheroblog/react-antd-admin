import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchLogin, fetchUserInfo, fetchLogout } from "#src/api/user";
import type { FormInitialValues } from "#src/pages/login";

export const authLoginThunk = createAsyncThunk(
	"auth/login",
	async (loginPayload: FormInitialValues) => {
		const response = await fetchLogin(loginPayload);
		const { token } = response.result;
		window.localStorage.setItem("token", token);
		window.location.href = "/";
		return token;
	},
);

export const authLogoutThunk = createAsyncThunk("auth/logout", async () => {
	const response = await fetchLogout();
	window.localStorage.removeItem("token");
	window.location.href = "/login";
	return response;
});

export const userInfoThunk = createAsyncThunk("userinfo", async () => {
	const response = await fetchUserInfo();
	return response.result;
});

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: window.localStorage.getItem("token"),
		userId: "",
		username: "",
		realName: "",
		avatar: "",
		desc: "",
		password: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(authLoginThunk.fulfilled, (state, action) => {
			state.token = action.payload;
		});
		builder.addCase(userInfoThunk.fulfilled, (state, action) => ({
			...state,
			...action.payload,
		}));
	},
});

export default userSlice;
