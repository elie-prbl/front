import { createSlice } from "@reduxjs/toolkit";

export interface positionState {
	longitude: number;
	latitude: number;
}

const initialState = {
	position: null as null | positionState,
};

export const positionSlice = createSlice({
	name: "position",
	initialState,
	reducers: {
		setPosition: (state, action) => {
			state.position = action.payload;
		},
	},
});

export const { setPosition } = positionSlice.actions;

export default positionSlice.reducer;
