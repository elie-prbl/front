import { createSlice } from "@reduxjs/toolkit";
import { getUserSuccesses, updateUserSuccesses } from "./UserSuccessesThunk";
import { Category, Tag } from "../UserQuests/UserQuestsSlices";

export interface Success {
	id: number;
	name: string;
	xp: number;
	done_condition: number;
	progression_rank: number;
	currency_reward: number;
	short_name: Category;
	tag_id: number;
	tag: Tag;
}

export interface UserSuccess {
	id: number;
	user_id: number;
	success_id: number;
	success: Success;
	progression: number;
	is_completed: boolean;
}

const initialState = {
	userSuccesses: null as null | UserSuccess[],
	isLoadingUserSuccesses: false,
	error: null as null | unknown,
	isModifiedUserSuccess: false,
	isRetrievedUserSuccess: false,
};

export const userSuccessesSlice = createSlice({
	name: "userSuccesses",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserSuccesses.pending, (state, action) => {
				state.isLoadingUserSuccesses = true;
				state.isModifiedUserSuccess = false;
				state.isRetrievedUserSuccess = false;
			})
			.addCase(getUserSuccesses.fulfilled, (state, action) => {
				state.userSuccesses = action.payload;
				state.isLoadingUserSuccesses = false;
				state.isRetrievedUserSuccess = true;
			})
			.addCase(getUserSuccesses.rejected, (state, action) => {
				state.isLoadingUserSuccesses = false;
				state.error = action.payload;
				state.isModifiedUserSuccess = false;
				state.isRetrievedUserSuccess = false;
			})
			.addCase(updateUserSuccesses.pending, (state, action) => {
				state.isLoadingUserSuccesses = true;
				state.isModifiedUserSuccess = false;
				state.isRetrievedUserSuccess = false;
			})
			.addCase(updateUserSuccesses.fulfilled, (state, action) => {
				state.userSuccesses = action.payload;
				state.isLoadingUserSuccesses = false;
				state.isModifiedUserSuccess = true;
				state.isRetrievedUserSuccess = false;
			})
			.addCase(updateUserSuccesses.rejected, (state, action) => {
				state.isLoadingUserSuccesses = false;
				state.error = action.payload;
				state.isModifiedUserSuccess = false;
				state.isRetrievedUserSuccess = false;
			});
	},
});

export default userSuccessesSlice.reducer;
