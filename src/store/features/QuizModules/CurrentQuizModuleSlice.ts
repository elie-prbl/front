import { createSlice } from "@reduxjs/toolkit";

export interface CurrentQuizModuleState {
	value: number;
}

const initialState: CurrentQuizModuleState = {
	value: 0,
};

export const CurrentQuizModuleSlice = createSlice({
	name: "CurrentQuizModule",
	initialState,
	reducers: {
		updateCurrentQuizModule: (state, action) => {
			state.value = action.payload;
		},
		restartCurrentQuizModule: state => {
			state.value = 0;
		},
	},
});

export const { updateCurrentQuizModule, restartCurrentQuizModule } = CurrentQuizModuleSlice.actions;

export default CurrentQuizModuleSlice.reducer;
