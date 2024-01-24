import { createSlice } from "@reduxjs/toolkit";
import { getSuccess } from "./SuccessThunk";
import { QuestsType } from "../Quests/QuestsSlices";

export interface successState {
	sid: number;
	name: string;
	xp: number;
	done_condition: number;
	rubis: number;
	description: string;
	type: QuestsType;
	progress: number;
}

const initialState = {
	success: [
		{
			sid: 1,
			name: "Gamer",
			xp: 1000,
			done_condition: 100,
			rubis: 100,
			description: "Joue à 100 quiz",
			type: QuestsType.QUIZ,
			progress: 0,
		},
		{
			sid: 2,
			name: "Elien",
			xp: 500,
			done_condition: 30,
			rubis: 50,
			description: "Connectes toi 30 fois",
			type: QuestsType.CONNECTION,
			progress: 1,
		},
		{
			sid: 3,
			name: "Winner",
			xp: 3000,
			done_condition: 100,
			rubis: 300,
			description: "Gagnes 100 quiz",
			type: QuestsType.QUIZWON,
			progress: 0,
		},
	] as successState[],
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const successSlice = createSlice({
	name: "success",
	initialState,
	reducers: {
		updateSuccessQuiz: state => {
			state.success.map(s => {
				if (s.type === QuestsType.QUIZ) {
					s.progress += 1;
				}
			});
		},
		updateSuccessQuizWon: state => {
			state.success.map(s => {
				if (s.type === QuestsType.QUIZWON || s.type === QuestsType.QUIZ) {
					s.progress += 1;
				}
			});
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
