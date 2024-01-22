import { createSlice } from "@reduxjs/toolkit";
import { getQuiz } from "./QuizThunk";
import { quizQuestionsState } from "../QuizQuestions/QuizQuestionsSlices";

export interface quizState {
	id: number;
	title: string;
	topic: string;
	questions: quizQuestionsState[];
}

const initialState = {
	quiz: null as null | quizState[],
	isLoadingQuiz: false,
	errorQuiz: null as null | unknown,
	isModified: false,
};

export const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getQuiz.pending, (state, action) => {
				state.isLoadingQuiz = true;
			})
			.addCase(getQuiz.fulfilled, (state, action) => {
				state.quiz = action.payload;
				state.isLoadingQuiz = false;
			})
			.addCase(getQuiz.rejected, (state, action) => {
				state.isLoadingQuiz = false;
				state.errorQuiz = action.payload;
				state.isModified = false;
			});
	},
});

export default quizSlice.reducer;
