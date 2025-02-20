import { createSlice } from "@reduxjs/toolkit";
import { createUserEvent, deleteUserEvent, getUsersEvents } from "./UserEventThunks";
import { eventI } from "../Events/EventSlices";

export interface userEventI {
	id: number;
	user_id: number;
	event_id: number;
	event: eventI;
	is_realized: boolean;
}

const initialState = {
	user_events: null as null | userEventI[],
	isLoadingUserEvent: false,
	error: null as string | null | unknown,
	isModifiedUserEvent: false,
};

export const UserEventsSlices = createSlice({
	name: "userEvents",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUsersEvents.pending, (state, action) => {
				state.isLoadingUserEvent = true;
				state.isModifiedUserEvent = false;
				state.error = false;
			})
			.addCase(getUsersEvents.fulfilled, (state, action) => {
				state.user_events = action.payload;
				state.isLoadingUserEvent = false;
				state.error = false;
				state.isModifiedUserEvent = false;
			})
			.addCase(getUsersEvents.rejected, (state, action) => {
				state.isLoadingUserEvent = false;
				state.error = action.payload;
				state.isModifiedUserEvent = false;
			})
			.addCase(createUserEvent.pending, (state, action) => {
				state.isLoadingUserEvent = true;
				state.isModifiedUserEvent = false;
				state.error = false;
			})
			.addCase(createUserEvent.fulfilled, (state, action) => {
				state.isLoadingUserEvent = false;
				state.isModifiedUserEvent = true;
				state.error = false;
			})
			.addCase(createUserEvent.rejected, (state, action) => {
				state.isLoadingUserEvent = false;
				state.error = action.payload;
				state.isModifiedUserEvent = false;
			})
			.addCase(deleteUserEvent.pending, (state, action) => {
				state.isLoadingUserEvent = true;
				state.isModifiedUserEvent = false;
				state.error = false;
			})
			.addCase(deleteUserEvent.fulfilled, (state, action) => {
				state.isLoadingUserEvent = false;
				state.isModifiedUserEvent = true;
				state.error = false;
				state.user_events = state.user_events?.filter(userEvent => userEvent.id !== action.payload) || [];
			})
			.addCase(deleteUserEvent.rejected, (state, action) => {
				state.isLoadingUserEvent = false;
				state.error = action.payload;
				state.isModifiedUserEvent = false;
			});
	},
});

export default UserEventsSlices.reducer;
