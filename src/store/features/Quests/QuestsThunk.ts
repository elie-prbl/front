import { createAsyncThunk } from "@reduxjs/toolkit";
export const getQuests = createAsyncThunk("getQuests", async (_, { rejectWithValue }) => {
	const response = await fetch(`https://dog.ceo/api/breeds/image/random`, {
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
