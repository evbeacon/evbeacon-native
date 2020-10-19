import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  Action,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import auth from "./auth/authSlice";
import charger from "./charger/chargerSlice";
import vehicle from "./vehicle/vehicleSlice";

const combinedReducer = combineReducers({
  auth,
  charger,
  vehicle,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: ["auth"],
};

export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
