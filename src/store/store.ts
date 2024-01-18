import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/UserSlices";
import quizReducer from "./features/Quiz/QuizSlices";
import quizModulesReducer from "./features/QuizModules/QuizModulesSlices";
import quizQuestionsReducer from "./features/QuizQuestions/QuizQuestionsSlices";
import currentQuestionIndexReducer from "./features/QuizQuestions/CurrentQuestionIndexSlices";
import successReducer from "./features/Success/SuccessSlices";
import questsReducer from "./features/Quests/QuestsSlices";
import rewardsReducer from "./features/Rewards/RewardsSlices";
import positionReducer from "./features/Position/PositionSlices";

const rootReducer = combineReducers({
	user: userReducer,
	quiz: quizReducer,
	quizModules: quizModulesReducer,
	quizQuestions: quizQuestionsReducer,
	currentQuestionIndex: currentQuestionIndexReducer,
	success: successReducer,
	quests: questsReducer,
	rewards: rewardsReducer,
	position: positionReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
