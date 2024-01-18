import { createSlice } from "@reduxjs/toolkit";
import { getQuizQuestions } from "./QuizQuestionsThunk";

export interface quizQuestionsState {
	qqid: number;
	qid: number;
	question: string;
	body: string[];
	correctAnswer: string;
}

const initialState = {
	questions: [
		{
			qqid: 0,
			qid: 0,
			question: "Quel est le processus par lequel l'énergie solaire est convertie en électricité ?",
			body: ["La photosynthèse", "La combustion solaire", "La conversion photovoltaïque", "La conversion thermique"],
			correctAnswer: "La conversion photovoltaïque",
		},
		{
			qqid: 1,
			qid: 0,
			question: "Quel élément est principalement utilisé dans les panneaux solaires pour capter la lumière du soleil ?",
			body: ["Le silicium", "L'hydrogène", "Le carbone", "L'oxygène"],
			correctAnswer: "Le silicium",
		},
		{
			qqid: 2,
			qid: 0,
			question:
				"Quel est l'appareil qui permet de suivre la trajectoire du soleil pour maximiser la capture d'énergie solaire ?",
			body: ["Le réflecteur solaire", "L'accumulateur solaire", "Le concentrateur solaire", "Le suiveur solaire"],
			correctAnswer: "Le suiveur solaire",
		},
	],
	isLoading: false,
	error: null as null | unknown,
	isModified: false,
};

export const quizQuestionsSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getQuizQuestions.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getQuizQuestions.fulfilled, (state, action) => {
				state.questions = action.payload;
				state.isLoading = false;
			})
			.addCase(getQuizQuestions.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isModified = false;
			});
	},
});

export default quizQuestionsSlice.reducer;
