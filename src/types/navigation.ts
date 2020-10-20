import { ChargerType } from "./charger";
import { VehicleType } from "./vehicle";

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Profile: undefined;
  AddCharger: undefined;
  EditCharger: {
    charger: ChargerType;
  };
  Chargers: undefined;
  AddVehicle: undefined;
  EditVehicle: {
    vehicle: VehicleType;
  };
  Vehicles: undefined;
};
