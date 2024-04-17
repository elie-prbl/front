import { createSlice } from "@reduxjs/toolkit";
import { getSuccess } from "./SuccessThunk";

export interface success {
	id: number;
	name: string;
	xp: number;
	done_condition: number;
	progression_rank: number;
	currency_reward: number;
	tags: string;
}

export interface successState {
	id: number;
	user_id: number;
	success_id: number;
	success: success;
	progression: number;
	is_completed: boolean;
}

const initialState = {
	success: null as null | successState[],
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const successSlice = createSlice({
	name: "success",
	initialState,
	reducers: {
		updateSuccessQuiz: state => {
			// state.success.map(s => {
			// 	if (s.type === QuestsType.QUIZ) {
			// 		s.progress += 1;
			// 	}
			// });
		},
		updateSuccessQuizWon: state => {
			// state.success.map(s => {
			// 	if (s.type === QuestsType.QUIZWON || s.type === QuestsType.QUIZ) {
			// 		s.progress += 1;
			// 	}
			// });
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getSuccess.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getSuccess.fulfilled, (state, action) => {
				state.success = action.payload;
				state.isLoading = false;
			})
			.addCase(getSuccess.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export const { updateSuccessQuiz, updateSuccessQuizWon } = successSlice.actions;

export default successSlice.reducer;
