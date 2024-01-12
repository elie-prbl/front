import {createSlice} from "@reduxjs/toolkit";
import {getQuiz} from "./QuizThunk";

export interface quizState {
    qid: number;
    tid: number;
    title: string;
    level: string;
}

const initialState = {
    quiz: null as null | quizState,
    isLoading: false,
    error: null	as null | unknown,
    isModified: false,
};

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getQuiz.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getQuiz.fulfilled, (state, action) => {
                state.quiz = action.payload
                state.isLoading = false
            })
            .addCase(getQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isModified = false;
            });
    }
});

export default quizSlice.reducer;

