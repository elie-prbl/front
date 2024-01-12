import { createSlice } from "@reduxjs/toolkit";
import { getQuizQuestions } from "./QuizQuestionsThunk";

export interface quizQuestionsState {
	qquid: number;
	qid: number;
	body: number;
	isCorrectAnswer: string;
}

const initialState = {
	quiz: null as null | quizQuestionsState,
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const quizQuestionsSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getQuizQuestions.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getQuizQuestions.fulfilled, (state, action) => {
				state.quiz = action.payload;
				state.isLoading = false;
			})
			.addCase(getQuizQuestions.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default quizQuestionsSlice.reducer;
