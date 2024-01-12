import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/UserSlices";
import quizReducer from "./features/Quiz/QuizSlices";
import quizQuestionsReducer from "./features/QuizQuestions/QuizQuestionsSlices";
import successReducer from "./features/Success/SuccessSlices";
import questsReducer from "./features/Quests/QuestsSlices";
import rewardsReducer from "./features/Rewards/RewardsSlices";

const rootReducer = combineReducers({
	user: userReducer,
	quiz: quizReducer,
	quizQuestions: quizQuestionsReducer,
	success: successReducer,
	quests: questsReducer,
	rewards: rewardsReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
