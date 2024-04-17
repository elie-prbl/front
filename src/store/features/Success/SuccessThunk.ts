import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
export const getSuccess = createAsyncThunk("getSuccess", async (_, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/successes/user?user_id=27`, {
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
