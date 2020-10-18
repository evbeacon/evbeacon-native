import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import auth from "./auth/authSlice";
import charger from "./charger/chargerSlice";
import vehicle from "./vehicle/vehicleSlice";

const combinedReducer = combineReducers({
  auth,
  charger,
  vehicle,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
