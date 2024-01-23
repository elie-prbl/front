import { createSlice } from "@reduxjs/toolkit";

export interface CurrentQuizState {
	value: number;
}

const initialState: CurrentQuizState = {
	value: 0,
};

export const CurrentQuizSlice = createSlice({
	name: "CurrentQuiz",
	initialState,
	reducers: {
		updateCurrentQuiz: (state, action) => {
			state.value = action.payload;
		},
		restartCurrentQuiz: state => {
			state.value = 0;
		},
	},
});

export const { updateCurrentQuiz, restartCurrentQuiz } = CurrentQuizSlice.actions;

export default CurrentQuizSlice.reducer;
