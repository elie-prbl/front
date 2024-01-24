import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./UserThunk";

export enum nameLevelType {
	BASIC = "Basic",
	INTERMEDIATE = "intermediate",
	ADVANCED = "advanced",
}

export interface level {
	id: number;
	name: nameLevelType;
	nextLevelXpRequirement: number;
	level_number: number;
	currencyWon: number;
}

export interface userState {
	lid: number;
	uuid: string;
	username: string;
	email: string;
	currency_amount: number;
	xp: number;
	level: level;
	quizzWin: number;
	distanceTraveled: number;
}

const initialState = {
	user: {
		lid: 1,
		uuid: "12345&433",
		username: "Robin Littière",
		email: "litiere.rob@gmail.com",
		currency_amount: 0,
		distanceTraveled: 0,
		xp: 0,
		quizzWin: 0,
		level: {
			id: 1,
			name: nameLevelType.BASIC,
			nextLevelXpRequirement: 100,
			level_number: 1,
			currencyWon: 0,
		},
	} as userState,
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUserXp: (state, action) => {
			state.user.xp += action.payload;
		},
		updateUserQuizWon: state => {
			state.user.quizzWin += 1;
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
