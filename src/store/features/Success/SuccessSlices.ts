import { createSlice } from "@reduxjs/toolkit";
import { getSuccess } from "./SuccessThunk";

export interface successState {
	sid: number;
	name: string;
	xp: number;
	done_condition: number;
	rubis: number;
	description: string;
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
		},
		{
			sid: 2,
			name: "Elien",
			xp: 500,
			done_condition: 30,
			rubis: 50,
			description: "Connectes toi 30 fois",
		},
		{
			sid: 3,
			name: "Winner",
			xp: 3000,
			done_condition: 100,
			rubis: 300,
			description: "Gagnes 100 quiz",
		},
	] as successState[],
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

export default successSlice.reducer;
