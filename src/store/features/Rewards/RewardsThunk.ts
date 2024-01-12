import { createAsyncThunk } from "@reduxjs/toolkit";
export const getRewards = createAsyncThunk("getRewards", async (_, { rejectWithValue }) => {
	const response = await fetch(`https://`, {
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
