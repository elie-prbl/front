import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export interface createEventBodyI {
	user_id: number;
	event_id: number;
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
	async (user_event: createEventBodyI, { rejectWithValue }) => {
		const response = await fetch(`${Url.BASE_URL_API}/events/user/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user_event),
		});
		try {
			return await response.json();
		} catch (err) {
			return rejectWithValue(`network error: ${err}`);
		}
	},
);

export const deleteUserEvent = createAsyncThunk(
	"deleteUserEvent",
	async (user_event_id: number, { rejectWithValue }) => {
		const response = await fetch(`${Url.BASE_URL_API}/events/user?user_event=${user_event_id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		try {
			return await response.json();
		} catch (err) {
			return rejectWithValue(`network error: ${err}`);
		}
	},
);
