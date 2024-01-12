import { createSlice } from "@reduxjs/toolkit";
import { getSuccess } from "./SuccessThunk";

export interface successState {
	sid: number;
	name: number;
	xp: string;
	done_condition: any;
	rubis: number;
}

const initialState = {
	quiz: null as null | successState,
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const successSlice = createSlice({
	name: "success",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getSuccess.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getSuccess.fulfilled, (state, action) => {
				state.quiz = action.payload;
				state.isLoading = false;
			})
			.addCase(getSuccess.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default successSlice.reducer;
