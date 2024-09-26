import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export interface updateUserSuccessReq {
	user_uuid: string;
	success_id: number;
}

export const getUserSuccesses = createAsyncThunk("getSuccess", async (user_uuid: string, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/successes/user?user_uuid=${user_uuid}`, {
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

export const updateUserSuccesses = createAsyncThunk(
	"updateUserSuccesses",
	async (body: updateUserSuccessReq, { rejectWithValue }) => {
		try {
			const response = await fetch(`${Url.BASE_URL_API}/successes/user/progress`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			return await response.json();
		} catch (err) {
			return rejectWithValue(`network error: ${err}`);
		}
	},
);
