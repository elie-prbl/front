import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./UserThunk";

export enum nameLevelType {
	BASIC = "Basic",
	INTERMEDIATE = "intermediate",
	ADVANCED = "advanced",
}

export interface level {
	id: number;
	name: string;
	nextLevelXpRequirement: number;
	level_number: number;
	currencyWon: number;
}

export interface userState {
	uuid: string;
	lid: number;
	level: level;
	email: string;
	username: string;
	UserQuests: any[];
	xp: number;
	currency_amount: number;
}

const initialState = {
	user: null as null | userState,
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUserXp: (state, action) => {
			// if (state.user) {
			// 	state.user.xp += action.payload;
			// }
		},
		updateUserQuizWon: state => {
			// if (state.user) {
			// 	state.user.quizzWin += 1;
			// }
		},
	},
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

export const { updateUserXp, updateUserQuizWon } = userSlice.actions;

export default userSlice.reducer;
