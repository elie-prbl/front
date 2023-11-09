import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";

const rootReducer = combineReducers({
	user: userReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
