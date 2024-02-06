import { createSlice } from "@reduxjs/toolkit";
import { getDailyQuests } from "./QuestsThunk";

export enum Difficulty {
	BEGINNER = "easy",
	INTERMEDIATE = "intermediate",
	ADVANCED = "advanced",
}

export enum QuestsType {
	QUIZ = "Quiz",
	QUIZWON = "QuizWon",
	CONNECTION = "Connection",
	GAMES = "Games",
	EVENT = "EVENT",
}

export interface QuestTypeI {
	id: number;
	type: QuestsType;
}
export interface QuestState {
	id: number;
	quest_type_id: number;
	quest_type: QuestTypeI;
	xp: number;
	difficulty: Difficulty;
	name: string;
	done_condition: any;
	progress: number;
	currency_reward: number;
	createdAt?: string;
	updatedAt?: string;
}

const initialState = {
	quests: [] as QuestState[],
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const getQuestsSlice = createSlice({
	name: "getQuests",
	initialState,
	reducers: {
		updateQuestsQuiz: state => {
			state.quests.map(q => {
				if (q.quest_type_id === 8) {
					q.progress += 1;
				}
			});
		},
		updateQuestsQuizWon: state => {
			state.quests.map(q => {
				if (q.quest_type_id === 9 || q.quest_type_id === 8) {
					q.progress += 1;
				}
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getDailyQuests.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getDailyQuests.fulfilled, (state, action) => {
				state.quests = action.payload;
				state.isLoading = false;
			})
			.addCase(getDailyQuests.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});
export const { updateQuestsQuiz, updateQuestsQuizWon } = getQuestsSlice.actions;

export default getQuestsSlice.reducer;
