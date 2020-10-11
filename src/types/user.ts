export type UserType = {
  _id: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  name: string;
  bio?: string;
  finishedCharger: boolean;
  finishedVehicle: boolean;
  banned: boolean;
};

export type SafeUserType = {
  _id: UserType["_id"];
  email: UserType["email"];
  role: UserType["role"];
  name: UserType["name"];
  bio?: UserType["bio"];
  finishedCharger: UserType["finishedCharger"];
  finishedVehicle: UserType["finishedVehicle"];
  banned: UserType["banned"];
};
