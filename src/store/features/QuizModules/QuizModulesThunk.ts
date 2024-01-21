import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
export const getQuizModules = createAsyncThunk("getQuizModules", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(Url.GAME_QUIZ, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const res = await response.json();
		return res[0]["data"]["topic"];
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});
