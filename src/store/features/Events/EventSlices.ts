import { createSlice } from "@reduxjs/toolkit";
import { createEvent, getEvents } from "./EventThunk";

export interface eventI {
	id?: number;
	name: string;
	description: string;
	address: string;
	city: string;
	zip_code: string;
	start_date: string;
	end_date: string;
	organizer_uuid: string;
	currency_win: number;
	number_of_participants: number;
	is_full: boolean;
}

const initialState = {
	events: null as null | eventI[],
	isLoadingEvents: false,
	errorEvents: null as null | unknown,
};

export const EventSlice = createSlice({
	name: "events",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getEvents.pending, (state, action) => {
				state.isLoadingEvents = true;
			})
			.addCase(getEvents.fulfilled, (state, action) => {
				state.events = action.payload;
				state.isLoadingEvents = false;
			})
			.addCase(getEvents.rejected, (state, action) => {
				state.isLoadingEvents = false;
				state.errorEvents = action.payload;
			})
			.addCase(createEvent.pending, (state, action) => {
				state.isLoadingEvents = true;
			})
			.addCase(createEvent.fulfilled, (state, action) => {
				state.events = action.payload;
				state.isLoadingEvents = false;
			})
			.addCase(createEvent.rejected, (state, action) => {
				state.isLoadingEvents = false;
				state.errorEvents = action.payload;
			});
	},
});

export default EventSlice.reducer;
