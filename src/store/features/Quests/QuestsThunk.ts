import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
export const getDailyQuests = createAsyncThunk("getQuests", async (_, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}quests/daily`, {
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
