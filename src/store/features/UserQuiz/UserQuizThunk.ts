import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export const getUserQuiz = createAsyncThunk("getUserQuiz", async (userId, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}games/quiz/${userId}`, {
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

export const submitUserQuiz = createAsyncThunk("submitUserQuiz", async (quizData, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}games/quiz/user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(quizData),
	});
	try {
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message || "Could not submit quiz");
		}
		return data;
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});
