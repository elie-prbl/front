import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export const getUserSuccesses = createAsyncThunk("getSuccess", async (id: number, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/successes/userSuccesses?user_id=${id}`, {
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
