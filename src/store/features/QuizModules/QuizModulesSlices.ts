import { createSlice } from "@reduxjs/toolkit";
import { getQuizModules } from "./QuizModulesThunk";

export interface quizModulesState {
	tid: number;
	name: string;
	description: string;
}

const initialState = {
	modules: [
		{
			tid: 0,
			name: "Tri des déchets",
			description: "Apprendre à mieux trier !",
		},
		{
			tid: 1,
			name: "Transport",
			description: "Apprendre à moins polluer !",
		},
	] as quizModulesState[],
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const quizModulesSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getQuizModules.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getQuizModules.fulfilled, (state, action) => {
				state.modules = action.payload;
				state.isLoading = false;
			})
			.addCase(getQuizModules.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default quizModulesSlice.reducer;
