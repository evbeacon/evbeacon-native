import { UserType } from "../user";

export type GetUserParams = {
  _id?: UserType["_id"];
};

export type GetUserResponse = UserType;

export type UpdateUserParams = {
  _id: UserType["_id"];
  name?: UserType["name"];
  bio?: UserType["bio"];
  finishedCharger?: UserType["finishedCharger"];
  finishedVehicle?: UserType["finishedVehicle"];
};

export type UpdateUserResponse = UserType;

export type BanUserParams = {
  _id: UserType["_id"];
  banned?: UserType["banned"];
};

export type BanUserResponse = null;
