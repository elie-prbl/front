import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";
import { topic } from "./QuizModulesSlices";

export const getQuizModules = createAsyncThunk("getQuizModules", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${Url.BASE_URL_API}games/quiz`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const res = await response.json();

		const topics = res[0]["data"]["topic"].map((topic: topic) => {
			return {
				id: topic["id"],
				name: topic["name"],
				description: topic["description"],
			};
		});

		return {
			quiz_id: res[0]["id"],
			topics,
		};
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});
