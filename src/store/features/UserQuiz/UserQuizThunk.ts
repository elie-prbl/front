import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

interface QuizData {
	user_uuid: string;
	quiz_id: string;
}

export const getUserQuiz = createAsyncThunk("getUserQuiz", async (quizData: QuizData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${Url.BASE_URL_API}/games/quiz/user/${quizData.user_uuid}/quiz/${quizData.quiz_id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorData = await response.json(); // Essayez de lire l'erreur si elle est au format JSON
			return rejectWithValue(`Error ${response.status}: ${errorData.message || "Could not fetch user quiz"}`);
		}

		return await response.json();
	} catch (err) {
		// @ts-ignore
		return rejectWithValue(`Network error: ${err.message || err}`);
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
