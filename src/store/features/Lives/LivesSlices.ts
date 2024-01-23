import { createSlice } from "@reduxjs/toolkit";

export interface LivesState {
	value: number;
}

const initialState: LivesState = {
	value: 5,
};

export const LivesSlice = createSlice({
	name: "Lives",
	initialState,
	reducers: {
		decrementLife: state => {
			state.value -= 1;
		},
		restartLives: state => {
			state.value = 5;
		},
	},
});

export const { decrementLife, restartLives } = LivesSlice.actions;

export default LivesSlice.reducer;
