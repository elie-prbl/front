import {createSlice} from "@reduxjs/toolkit";
import {getUser} from "./UserThunk";

export interface userState {
    id: number;
    uid: number;
    username: string;
    email: string;
    password: string;
    rubis: number;
    xp: number;
}

const initialState = {
    user: null as null | userState,
    isLoading: false,
    error: null	as null | unknown,
    isModified: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isModified = false;
            });
    }
});

export default userSlice.reducer;

