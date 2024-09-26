import { createSlice } from "@reduxjs/toolkit";
import { getUserQuiz, submitUserQuiz } from "./UserQuizThunk";

export interface nextQuiz {
	id: number;
	topic: string;
	title: string;
}

export interface userQuiz {
	quizIds: [string];
	nextQuiz: nextQuiz;
}

const initialState = {
	userQuiz: null as null | userQuiz,
	isLoadingUserQuiz: false,
	error: null as null | unknown,
	isModified: false,
};

export const UserQuizSlices = createSlice({
	name: "userQuiz",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserQuiz.pending, (state, action) => {
				state.isLoadingUserQuiz = true;
			})
			.addCase(getUserQuiz.fulfilled, (state, action) => {
				state.userQuiz = action.payload;
				state.isLoadingUserQuiz = false;
				state.isModified = true;
			})
			.addCase(getUserQuiz.rejected, (state, action) => {
				state.isLoadingUserQuiz = false;
				state.error = action.payload;
				state.isModified = false;
			})
			.addCase(submitUserQuiz.pending, (state, action) => {
				state.isLoadingUserQuiz = true;
			})
			.addCase(submitUserQuiz.fulfilled, (state, action) => {
				state.userQuiz = action.payload;
				state.isLoadingUserQuiz = false;
				state.isModified = true;
			})
			.addCase(submitUserQuiz.rejected, (state, action) => {
				state.isLoadingUserQuiz = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default UserQuizSlices.reducer;
