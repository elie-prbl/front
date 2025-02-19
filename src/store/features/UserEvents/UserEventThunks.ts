import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
import { userEventI } from "./UserEventSlices";

export interface getEventsParamsI {
	latitude: number;
	longitude: number;
}

export const getUsersEvents = createAsyncThunk("getQuests", async (user_uuid: string, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/events/user?user_uuid=${user_uuid}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	try {
		return await response.json();
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});

export const createUserEvent = createAsyncThunk(
	"createUserEvent",
	async (user_event: userEventI, { rejectWithValue }) => {
		console.log("user_event", user_event);
		const response = await fetch(`${Url.BASE_URL_API}/events/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user_event),
		});
		console.log("response", response);
		try {
			console.log("response", response.json());
			return await response.json();
		} catch (err) {
			return rejectWithValue(`network error: ${err}`);
		}
	},
);
