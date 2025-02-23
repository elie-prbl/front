import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export interface updateUserQuestReq {
	user_uuid: string;
	quest_id: number;
}

export const getUserQuests = createAsyncThunk("getQuests", async (user_uuid: string, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/quests/user?user_uuid=${user_uuid}`, {
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

export const updateUserQuest = createAsyncThunk(
	"updateUserQuest",
	async (body: updateUserQuestReq, { rejectWithValue }) => {
		try {
			const response = await fetch(`${Url.BASE_URL_API}/quests/user`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			return await response.json();
		} catch (err) {
			return rejectWithValue(`network error: ${err}`);
		}
	},
);
