import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as chargerAPI from "../../actions/charger";
import type {
  ChargerState,
  DeleteChargerAction,
  SetChargersAction,
  UpdateChargerAction,
} from "./types";
import { RootState } from "../index";
import {
  DeleteChargerParams,
  UpdateChargerParams,
} from "../../types/actions/charger";

const initialState: ChargerState = {
  loaded: false,
  error: null,
  chargers: [],
};

const getChargers = createAsyncThunk<
  SetChargersAction,
  void,
  { state: RootState }
>("charger/getChargers", async (_, { getState, rejectWithValue }) => {
  const state = getState();

  try {
    return await chargerAPI.getCharger(state.auth.token!, {});
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateCharger = createAsyncThunk<
  UpdateChargerAction,
  UpdateChargerParams,
  { state: RootState }
>(
  "charger/updateCharger",
  async (
    updatedCharger: UpdateChargerParams,
    { getState, rejectWithValue }
  ) => {
    const state = getState();

    try {
      return await chargerAPI.updateCharger(state.auth.token!, updatedCharger);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteCharger = createAsyncThunk<
  DeleteChargerAction,
  DeleteChargerParams,
  { state: RootState }
>(
  "charger/deleteCharger",
  async (
    deletedCharger: DeleteChargerParams,
    { getState, rejectWithValue }
  ) => {
    const state = getState();

    try {
      return await chargerAPI.deleteCharger(state.auth.token!, deletedCharger);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chargerSlice = createSlice({
  name: "charger",
  initialState,
  reducers: {
    clearChargers() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChargers.fulfilled, (state, action) => {
      state.chargers = action.payload;
    });
    builder.addCase(updateCharger.fulfilled, (state, action) => {
      state.chargers = state.chargers.map((charger) =>
        charger._id === action.payload._id ? action.payload : charger
      );
    });
    builder.addCase(deleteCharger.fulfilled, (state, action) => {
      state.chargers = state.chargers.filter(
        (charger) => charger._id !== action.payload._id
      );
    });
  },
});

export default chargerSlice.reducer;
export const { clearChargers } = chargerSlice.actions;
export { getChargers, updateCharger, deleteCharger };
