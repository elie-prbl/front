import { createSlice } from "@reduxjs/toolkit";
import { getUserQuests } from "./UserQuestsThunk";

export enum Difficulty {
	BEGINNER = "easy",
	INTERMEDIATE = "intermediate",
	ADVANCED = "advanced",
}

export interface TagName {
	PlayQuizTag: "PlayQuizTag";
	PlayGameTag: "PlayGameTag";
	WonQuizTag: "WonQuizTag";
	WonGameTag: "WonGameTag";
	ConnectionTag: "ConnectionTag";
	LevelTag: "LevelTag";
	AvatarTag: "AvatarTag";
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
	isLoading: false,
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
				state.isLoading = true;
			})
			.addCase(getUserQuests.fulfilled, (state, action) => {
				state.userQuests = action.payload;
				state.isLoading = false;
			})
			.addCase(getUserQuests.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default getUserQuestsSlice.reducer;
