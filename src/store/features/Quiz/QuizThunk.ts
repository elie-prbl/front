import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export interface getQuizParams {
	id: number;
	topic_id: number;
}

export const getQuiz = createAsyncThunk("getQuiz", async (getQuizParam: getQuizParams, { rejectWithValue }) => {
	const response = await fetch(
		`${Url.BASE_URL_API}/games/quiz/${getQuizParam.id}/data?topic_id=${getQuizParam.topic_id}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	try {
		return await response.json();
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});
