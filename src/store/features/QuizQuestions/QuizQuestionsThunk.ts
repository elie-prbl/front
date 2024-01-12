import { createAsyncThunk } from "@reduxjs/toolkit";
import { quizState } from "../Quiz/QuizSlices";
export const getQuizQuestions = createAsyncThunk("getQuizQuestions", async (data: quizState, { rejectWithValue }) => {
	const response = await fetch(`https://${data.qid}`, {
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
