import { createSlice } from "@reduxjs/toolkit";
import { getUserQuiz, submitUserQuiz } from "./UserQuizThunk"; // Assurez-vous d'importer correctement les thunks.

export interface UserQuizState {
	quizzes: any[]; // Définissez un type plus précis selon votre structure de données.
	isLoading: boolean;
	error: null | string;
	isModified: boolean;
}

const initialState: UserQuizState = {
	quizzes: [],
	isLoading: false,
	error: null,
	isModified: false,
};

export const userQuizSlice = createSlice({
	name: "userQuiz",
	initialState,
	reducers: {
		// Ajoutez ici des reducers personnalisés si nécessaire.
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserQuiz.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserQuiz.fulfilled, (state, action) => {
				state.quizzes = action.payload;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getUserQuiz.rejected, (state, action) => {
				state.isLoading = false;
				// @ts-ignore
				state.error = action.payload;
			})
			.addCase(submitUserQuiz.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(submitUserQuiz.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isModified = true;
				state.error = null;
			})
			.addCase(submitUserQuiz.rejected, (state, action) => {
				state.isLoading = false;
				// @ts-ignore
				state.error = action.payload;
			});
	},
});

export default userQuizSlice.reducer;
