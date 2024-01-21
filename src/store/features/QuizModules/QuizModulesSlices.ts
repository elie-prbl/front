import { createSlice } from "@reduxjs/toolkit";
import { getQuizModules } from "./QuizModulesThunk";

export interface quizModulesState {
	id: number;
	name: string;
	description: string;
	quizzes: [];
}

const initialState = {
	modules: null as null | quizModulesState[],
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const quizModulesSlice = createSlice({
	name: "quizModules",
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
