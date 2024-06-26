import { createSlice } from "@reduxjs/toolkit";
import { getUserSuccesses } from "./UserSuccessesThunk";
import { Tag } from "../UserQuests/UserQuestsSlices";

export interface Success {
	id: number;
	name: string;
	xp: number;
	done_condition: number;
	progression_rank: number;
	currency_reward: number;
	tag_id: number;
	tag: Tag;
}

export interface userSuccessState {
	id: number;
	user_id: number;
	userSuccesses_id: number;
	success: Success;
	progression: number;
	is_completed: boolean;
}

const initialState = {
	userSuccesses: null as null | userSuccessState[],
	isLoadingUserSuccesses: false,
	error: null as null | unknown,
	isModified: false,
};

export const userSuccessesSlice = createSlice({
	name: "userSuccesses",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserSuccesses.pending, (state, action) => {
				state.isLoadingUserSuccesses = true;
			})
			.addCase(getUserSuccesses.fulfilled, (state, action) => {
				state.userSuccesses = action.payload;
				state.isLoadingUserSuccesses = false;
			})
			.addCase(getUserSuccesses.rejected, (state, action) => {
				state.isLoadingUserSuccesses = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default userSuccessesSlice.reducer;
