import { UserType } from "./user";

export type ReportType = {
  _id: string;
  type: "User" | "Charger" | "Vehicle";
  reported: string;
  madeBy: UserType["_id"];
  reason: string;
  explanation: string;
  decided: boolean;
  decidedBy?: UserType["_id"];
  ruling?: string;
};
