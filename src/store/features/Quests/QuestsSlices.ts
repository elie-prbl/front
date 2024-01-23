import { createSlice } from "@reduxjs/toolkit";
import { getQuests } from "./QuestsThunk";

export enum Difficulty {
	BEGINNER = "BEGINNER",
	INTERMEDIATE = "INTERMEDIATE",
	ADVANCED = "ADVANCED",
}

export enum QuestsType {
	QUIZ = "QUIZ",
	QUIZWON = "QUIZWON",
	CONNECTION = "CONNECTION",
	SCAN = "SCAN",
	EVENT = "EVENT",
}
export interface QuestState {
	qeid: number;
	name: string;
	xp: number;
	qtid: string;
	difficulty: Difficulty;
	done_condition: any;
	progress: number;
}

const initialState = {
	quests: [
		{
			qeid: 2,
			name: "Joue à 1 quiz",
			xp: 10,
			qtid: QuestsType.QUIZ,
			difficulty: Difficulty.BEGINNER,
			done_condition: 1,
			progress: 0,
		},
		{
			qeid: 3,
			name: "Gagne 1 quiz",
			xp: 20,
			qtid: QuestsType.QUIZWON,
			difficulty: Difficulty.INTERMEDIATE,
			done_condition: 1,
			progress: 0,
		},
		{
			qeid: 5,
			name: "Gagne 3 quiz",
			xp: 50,
			qtid: QuestsType.QUIZWON,
			difficulty: Difficulty.ADVANCED,
			done_condition: 3,
			progress: 0,
		},
	],
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
				if (q.qtid === QuestsType.QUIZ) {
					q.progress += 1;
				}
			});
		},
		updateQuestsQuizWon: state => {
			state.quests.map(q => {
				if (q.qtid === QuestsType.QUIZWON || q.qtid === QuestsType.QUIZ) {
					q.progress += 1;
				}
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getQuests.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getQuests.fulfilled, (state, action) => {
				state.quests = action.payload;
				state.isLoading = false;
			})
			.addCase(getQuests.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});
export const { updateQuestsQuiz, updateQuestsQuizWon } = getQuestsSlice.actions;

export default getQuestsSlice.reducer;
