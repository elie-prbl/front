import { createSlice } from "@reduxjs/toolkit";
import { getCommunityGames } from "./GamesThunk";

export interface GamesState {
	community_games: communityGamesState[];
}

export interface communityGamesState {
	id: number;
	title: string;
	short_description: string;
	description: string;
}

const initialState = {
	games: null as null | GamesState,
	isLoadingGames: false,
	errorGames: null as null | unknown,
};

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getCommunityGames.pending, (state, action) => {
				state.isLoadingGames = true;
			})
			.addCase(getCommunityGames.fulfilled, (state, action) => {
				state.games = action.payload;
				state.isLoadingGames = false;
			})
			.addCase(getCommunityGames.rejected, (state, action) => {
				state.isLoadingGames = false;
				state.errorGames = action.payload;
			});
	},
});

export default gamesSlice.reducer;
