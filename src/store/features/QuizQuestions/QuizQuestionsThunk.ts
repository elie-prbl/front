import { createAsyncThunk } from "@reduxjs/toolkit";
import { quizState } from "../Quiz/QuizSlices";
import { Url } from "../../../base/constant";
export const getQuizQuestions = createAsyncThunk("getQuizQuestions", async (data: quizState, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}}`, {
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
