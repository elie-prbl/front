import { createSlice } from "@reduxjs/toolkit";
import { getRewards } from "./RewardsThunk";

export interface rewardsState {
	rid: number;
	rtid: number;
	name: string;
	rubisCost: number;
}

const initialState = {
	quiz: null as null | rewardsState,
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const rewardsSlice = createSlice({
	name: "rewards",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getRewards.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getRewards.fulfilled, (state, action) => {
				state.quiz = action.payload;
				state.isLoading = false;
			})
			.addCase(getRewards.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default rewardsSlice.reducer;
