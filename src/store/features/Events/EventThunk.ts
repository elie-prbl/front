import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export interface getEventsParamsI {
	latitude: number;
	longitude: number;
}

export interface createEventBodyI {
	name: string;
	description: string;
	address: string;
	city: string;
	zip_code: string;
	start_date: string;
	end_date: string;
	organizer_uuid: string;
	number_of_participants: number;
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

export const createEvent = createAsyncThunk("createEvent", async (event: createEventBodyI, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/events/`, {
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
