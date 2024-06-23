import { createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../../../base/constant";

interface Login {
	email: string;
}

export const loginUser = createAsyncThunk("login", async (login: Login, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(login),
	});
	try {
		if (!response.ok) {
			const err = await response.json();
			return rejectWithValue(`login error: ${err}`);
		}

		return await response.json();
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});

export const getUser = createAsyncThunk("getUser", async (uuid: string, { rejectWithValue }) => {
	const response = await fetch(`${Url.BASE_URL_API}/users/${uuid}`, {
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
