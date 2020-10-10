import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { AuthState, SetTokenAction } from "./types";

const initialState: AuthState = {
  token: null,
  loggedIn: false,
};

const setToken = createAsyncThunk("auth/setToken", async (token: string) => {
  await SecureStore.setItemAsync("token", token);

  return {
    token,
  };
});

const removeToken = createAsyncThunk("auth/removeToken", async () => {
  await SecureStore.deleteItemAsync("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [setToken.fulfilled]: (state, action: PayloadAction<SetTokenAction>) => {
      const { token } = action.payload;

      if (token != null && token.length > 0) {
        state.token = token;
        state.loggedIn = true;
      } else {
        state.token = null;
        state.loggedIn = false;
      }
    },
    [removeToken.fulfilled]: (state) => {
      state.token = null;
      state.loggedIn = false;
    },
  },
});

//export const { } = authSlice.actions;

export default authSlice.reducer;
export { setToken, removeToken };
