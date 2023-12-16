import { createSlice } from "@reduxjs/toolkit";

export interface userState {
	id: number;
	uid: number;
	username: string;
	email: string;
	password: string;
	rubis: number;
	xp: number;
}

const initialState = {
	user: null as null | userState,
	isLoading: false,
	error: null,
	isModified: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
