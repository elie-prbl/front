import { createSlice } from "@reduxjs/toolkit";
import { getUserQuests, updateUserQuest } from "./UserQuestsThunk";

export enum Difficulty {
	BEGINNER = "easy",
	INTERMEDIATE = "intermediate",
	ADVANCED = "advanced",
}

export enum TagName {
	PlayGames = "PlayGames",
	WinGames = "WinGames",
	Connection = "Connection",
	Level = "Level",
	Avatar = "Avatar",
}

export interface Tag {
	id: number;
	name: TagName;
}

export interface Quest {
	id: number;
	tag_id: number;
	tag: Tag;
	name: string;
	xp: number;
	difficulty: Difficulty;
	done_condition: number;
}

export interface UserQuest {
	id: number;
	user_id: number;
	quest_id: number;
	quest: Quest;
	progression: number;
	is_completed: boolean;
}

const initialState = {
	userQuests: [] as UserQuest[],
	isLoadingUserQuest: false,
	error: null as string | null | unknown,
	isModified: false,
};

export const getUserQuestsSlice = createSlice({
	name: "getUserQuests",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserQuests.pending, (state, action) => {
				state.isLoadingUserQuest = true;
				state.isModified = false;
			})
			.addCase(getUserQuests.fulfilled, (state, action) => {
				state.userQuests = action.payload;
				state.isLoadingUserQuest = false;
				state.isModified = false;
			})
			.addCase(getUserQuests.rejected, (state, action) => {
				state.isLoadingUserQuest = false;
				state.error = action.payload;
				state.isModified = false;
			})
			.addCase(updateUserQuest.pending, (state, action) => {
				state.isLoadingUserQuest = true;
				state.isModified = false;
			})
			.addCase(updateUserQuest.fulfilled, (state, action) => {
				state.userQuests = action.payload;
				state.isLoadingUserQuest = false;
				state.isModified = true;
			})
			.addCase(updateUserQuest.rejected, (state, action) => {
				state.isLoadingUserQuest = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default getUserQuestsSlice.reducer;
