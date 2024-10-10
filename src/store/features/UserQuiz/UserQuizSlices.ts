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
	errorUserQuiz: null as null | unknown,
	isModifiedUserQuiz: false,
};

export const UserQuizSlices = createSlice({
	name: "userQuiz",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserQuiz.pending, (state, action) => {
				state.isLoadingUserQuiz = true;
				state.isModifiedUserQuiz = false;
				state.errorUserQuiz = false;
			})
			.addCase(getUserQuiz.fulfilled, (state, action) => {
				state.userQuiz = action.payload;
				state.isLoadingUserQuiz = false;
				state.errorUserQuiz = false;
				state.isModifiedUserQuiz = true;
			})
			.addCase(getUserQuiz.rejected, (state, action) => {
				state.isLoadingUserQuiz = false;
				state.errorUserQuiz = action.payload;
				state.isModifiedUserQuiz = false;
			})
			.addCase(submitUserQuiz.pending, (state, action) => {
				state.isLoadingUserQuiz = true;
				state.isModifiedUserQuiz = false;
				state.errorUserQuiz = false;
			})
			.addCase(submitUserQuiz.fulfilled, (state, action) => {
				state.userQuiz = action.payload;
				state.isLoadingUserQuiz = false;
				state.isModifiedUserQuiz = true;
				state.errorUserQuiz = false;
			})
			.addCase(submitUserQuiz.rejected, (state, action) => {
				state.isLoadingUserQuiz = false;
				state.errorUserQuiz = action.payload;
				state.isModifiedUserQuiz = false;
			});
	},
});

export default UserQuizSlices.reducer;
