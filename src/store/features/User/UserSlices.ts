import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./UserThunk";

export interface userState {
	id: number;
	uid: number;
	username: string;
	email: string;
	password: string;
	rubis: number;
	xp: number;
	createdAt?: string;
	quizzWin?: number;
	distanceTraveled?: number;
	accuracy?: number;
}

const initialState = {
	user: {
		id: 1,
		uid: 1232,
		username: "Robin Littière",
		email: "litiere.rob@gmail.com",
		password: "",
		rubis: 0,
		xp: 0,
		createdAt: "Novembre 2023",
		quizzWin: 0,
		distanceTraveled: 0,
		accuracy: 0,
	} as userState,
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoading = false;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default userSlice.reducer;
