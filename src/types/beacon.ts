import { UserType } from "./user";
import { VehicleType } from "./vehicle";
import { LocationType } from "./location";

export type BeaconType = {
  _id: string;
  owner: UserType["_id"];
  vehicle: VehicleType["_id"];
  vehicleRange: number;
  location: LocationType;
  allowedChargers: ChargerType["_id"][];
  cancelled: boolean;
};
