import { createSlice } from "@reduxjs/toolkit";
import { getPlaces } from "./PlacesThunk";

export interface PlaceI {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	road: string;
	town: string;
}

const initialState = {
	places: null as null | PlaceI[],
	isLoadingPlaces: false,
	errorPlaces: null as null | unknown,
};

export const placesSlice = createSlice({
	name: "places",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getPlaces.pending, (state, action) => {
				state.isLoadingPlaces = true;
			})
			.addCase(getPlaces.fulfilled, (state, action) => {
				state.places = action.payload;
				state.isLoadingPlaces = false;
			})
			.addCase(getPlaces.rejected, (state, action) => {
				state.isLoadingPlaces = false;
				state.errorPlaces = action.payload;
			});
	},
});

export default placesSlice.reducer;
