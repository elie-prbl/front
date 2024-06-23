import { createSlice } from "@reduxjs/toolkit";
import { getUserQuiz, submitUserQuiz } from "./UserQuizThunk";

export interface UserQuiz {
	id: number;
	user_id: number;
	quiz_id: string;
}

export interface UserQuizState {
	userQuiz: UserQuiz[];
	isLoading: boolean;
	error: null | string;
	isModified: boolean;
}

const initialState: UserQuizState = {
	userQuiz: [],
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
				state.userQuiz = action.payload;
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
