import { createSlice } from "@reduxjs/toolkit";

export interface CurrentQuestionIndexState {
	value: number;
}

const initialState: CurrentQuestionIndexState = {
	value: 0,
};

export const currentQuestionIndexSlice = createSlice({
	name: "currentQuestionIndex",
	initialState,
	reducers: {
		incrementCurrentQuestionIndexState: state => {
			state.value += 1;
		},
		restartCurrentQuestionIndexState: state => {
			state.value = 0;
		},
	},
});

export const { incrementCurrentQuestionIndexState, restartCurrentQuestionIndexState } =
	currentQuestionIndexSlice.actions;

export default currentQuestionIndexSlice.reducer;
