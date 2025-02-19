import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

export const getCommunityGames = createAsyncThunk("getCommunityGames", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${Url.BASE_URL_API}/games`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const res = await response.json();

		return res["community_games"];
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});
