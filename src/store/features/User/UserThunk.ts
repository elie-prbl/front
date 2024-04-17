import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
export const getUser = createAsyncThunk("getUser", async (_, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/users/adbb4539-f221-4ab5-8b2d-5df1e9ef8e18`, {
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
