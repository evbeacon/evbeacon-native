import * as Location from "expo-location";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getUser } from "../actions/user";
import { getCharger } from "../actions/charger";
import { getVehicle } from "../actions/vehicle";
import { store } from "../redux";
import { setToken, setUser } from "../redux/auth/authSlice";
import { setChargers } from "../redux/charger/chargerSlice";
import { setVehicles } from "../redux/vehicle/vehicleSlice";

export const setupPermissions = async (): Promise<void> => {
  try {
    const { status: locationStatus } = await Location.requestPermissionsAsync();
    if (locationStatus !== "granted") {
      throw new Error("Permission to access location was denied");
    }
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "Ok" }], {
      cancelable: false,
    });
  }
};

export const setupRedux = async (): Promise<void> => {
  const storedToken = await SecureStore.getItemAsync("token");

  if (storedToken != null) {
    try {
      const user = await getUser(storedToken, {});

      await store.dispatch(setToken(storedToken));

      await store.dispatch(setUser(user));
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "Ok" }], {
        cancelable: false,
      });
    }
  }
};

export const setupAuthed = async (token: string): Promise<void> => {
  try {
    const chargers = await getCharger(token, {});
    await store.dispatch(setChargers(chargers));

    const vehicles = await getVehicle(token, {});
    await store.dispatch(setVehicles(vehicles));
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "Ok" }], {
      cancelable: false,
    });
  }
};
