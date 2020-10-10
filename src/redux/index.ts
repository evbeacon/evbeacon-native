import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import auth from "./auth/authSlice";

const combinedReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
