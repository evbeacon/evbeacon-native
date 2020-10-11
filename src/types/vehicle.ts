import { UserType } from "./user";

export type VehicleType = {
  _id: string;
  owner: UserType["_id"];
  year: number;
  make: string;
  model: string;
  color: string;
  plugType: string;
  licensePlate: string;
  banned: boolean;
};
