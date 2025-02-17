import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/UserSlices";
import quizReducer from "./features/Quiz/QuizSlices";
import quizModulesReducer from "./features/QuizModules/QuizModulesSlices";
import quizQuestionsReducer from "./features/QuizQuestions/QuizQuestionsSlices";
import currentQuestionIndexReducer from "./features/QuizQuestions/CurrentQuestionIndexSlices";
import currentQuizModuleReducer from "./features/QuizModules/CurrentQuizModuleSlice";
import currentQuizReducer from "./features/Quiz/CurrentQuizSlice";
import livesReducer from "./features/Lives/LivesSlices";
import userSuccessesReducer from "./features/UserSuccesses/UserSuccessesSlices";
import userQuestsReducer from "./features/UserQuests/UserQuestsSlices";
import rewardsReducer from "./features/Rewards/RewardsSlices";
import positionReducer from "./features/Position/PositionSlices";
import userQuizReducer from "./features/UserQuiz/UserQuizSlices";
import shopReducer from "./features/Shop/ShopSlices";
import eventReducer from "./features/Events/EventSlices";
import placeReducer from "./features/Places/PlacesSlice";

const rootReducer = combineReducers({
	user: userReducer,
	quiz: quizReducer,
	quizModules: quizModulesReducer,
	quizQuestions: quizQuestionsReducer,
	currentQuestionIndex: currentQuestionIndexReducer,
	currentQuizModule: currentQuizModuleReducer,
	currentQuiz: currentQuizReducer,
	lives: livesReducer,
	userSuccesses: userSuccessesReducer,
	userQuests: userQuestsReducer,
	userQuiz: userQuizReducer,
	rewards: rewardsReducer,
	position: positionReducer,
	shop: shopReducer,
	events: eventReducer,
	places: placeReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
