import { createSlice } from "@reduxjs/toolkit";
import { getUserSuccesses, updateUserSuccesses } from "./UserSuccessesThunk";
import { Category, Tag } from "../UserQuests/UserQuestsSlices";

export interface PlatformSuccess {
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

export interface PlatformSuccesses {
	id: number;
	user_id: number;
	success_id: number;
	success: PlatformSuccess;
	progression: number;
	is_completed: boolean;
}

export interface CommunityGame {
	id: number;
	title: string;
	short_description: string;
	description: string;
}

export interface CommunitySuccess {
	id: number;
	game_id: number;
	name: string;
	description: string;
	game: CommunityGame;
}

export interface CommunitySuccesses {
	id: number;
	user_reference: string;
	is_validated: boolean;
	success: CommunitySuccess;
}

export interface Successes {
	platform_successes: PlatformSuccesses[];
	community_successes: CommunitySuccesses[];
}

const initialState = {
	userSuccesses: null as null | Successes,
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
