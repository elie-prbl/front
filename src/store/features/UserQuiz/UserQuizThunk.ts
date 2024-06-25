import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

interface QuizData {
	user_uuid: string | undefined;
	quiz_id: string;
}

export const getUserQuiz = createAsyncThunk("getUserQuiz", async (userId: string , { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/games/quiz/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	try {
		const data = await response.json();
		return data;
	} catch (err) {
		return rejectWithValue(`network error GET UserQuizz: ${err}`);
	}
});

export const submitUserQuiz = createAsyncThunk("submitUserQuiz", async (quizData: QuizData, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/games/quiz/user`, {
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
