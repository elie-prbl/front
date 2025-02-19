import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
import { eventI } from "./EventSlices";

export interface getEventsParamsI {
	latitude: number;
	longitude: number;
}

export const getEvents = createAsyncThunk(
	"getEvents",
	async (getEventsParams: getEventsParamsI, { rejectWithValue }) => {
		const response = await fetch(
			`${Url.BASE_URL_API}/events/${getEventsParams.latitude}/${getEventsParams.longitude}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		try {
			return await response.json();
		} catch (err) {
			return rejectWithValue(`network error: ${err}`);
		}
	},
);

export const createEvent = createAsyncThunk("createEvent", async (event: eventI, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/events`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event),
	});
	try {
		return await response.json();
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});
