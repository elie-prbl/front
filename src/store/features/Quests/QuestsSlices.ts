import {createSlice} from "@reduxjs/toolkit";
import {getQuests} from "./QuestsThunk";

export enum Difficulty {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}
export interface QuestState {
    qeid: number;
    name: string;
    xp: number;
    qtid: number;
    difficulty: Difficulty;
    done_condition: any;
}

const initialState = {
    quiz: null as null | QuestState,
    isLoading: false,
    error: null	as null | unknown,
    isModified: false,
};

export const getQuestsSlice = createSlice({
    name: "getQuests",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getQuests.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getQuests.fulfilled, (state, action) => {
                state.quiz = action.payload
                state.isLoading = false
            })
            .addCase(getQuests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isModified = false;
            });
    }
});

export default getQuestsSlice.reducer;
