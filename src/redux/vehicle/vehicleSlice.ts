import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as vehicleAPI from "../../actions/vehicle";
import type {
  VehicleState,
  SetVehiclesAction,
  UpdateVehicleAction,
  DeleteVehicleAction,
} from "./types";
import { RootState } from "../index";
import {
  DeleteVehicleParams,
  UpdateVehicleParams,
} from "../../types/actions/vehicle";

const initialState: VehicleState = {
  loaded: false,
  error: null,
  vehicles: [],
};

const getVehicles = createAsyncThunk<
  SetVehiclesAction,
  void,
  { state: RootState }
>("vehicle/getVehicles", async (_, { getState, rejectWithValue }) => {
  const state = getState();

  try {
    return await vehicleAPI.getVehicle(state.auth.token!, {});
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateVehicle = createAsyncThunk<
  UpdateVehicleAction,
  UpdateVehicleParams,
  { state: RootState }
>(
  "vehicle/updateVehicle",
  async (
    updatedVehicle: UpdateVehicleParams,
    { getState, rejectWithValue }
  ) => {
    const state = getState();

    try {
      return await vehicleAPI.updateVehicle(state.auth.token!, updatedVehicle);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteVehicle = createAsyncThunk<
  DeleteVehicleAction,
  DeleteVehicleParams,
  { state: RootState }
>(
  "vehicle/deleteVehicle",
  async (
    deletedVehicle: DeleteVehicleParams,
    { getState, rejectWithValue }
  ) => {
    const state = getState();

    try {
      return await vehicleAPI.deleteVehicle(state.auth.token!, deletedVehicle);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    clearVehicles() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVehicles.fulfilled, (state, action) => {
      state.vehicles = action.payload;
    });
    builder.addCase(updateVehicle.fulfilled, (state, action) => {
      state.vehicles = state.vehicles.map((vehicle) =>
        vehicle._id === action.payload._id ? action.payload : vehicle
      );
    });
    builder.addCase(deleteVehicle.fulfilled, (state, action) => {
      state.vehicles = state.vehicles.filter(
        (vehicle) => vehicle._id !== action.payload._id
      );
    });
  },
});

export default vehicleSlice.reducer;
export const { clearVehicles } = vehicleSlice.actions;
export { getVehicles, updateVehicle, deleteVehicle };
