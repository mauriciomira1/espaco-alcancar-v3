import { SensoryProfileResponseInterface } from "./SensoryProfileInterfaces";

export interface ChildDefaultResponse {
  id: string;
  name: string;
  birth: string;
  gender: string;
}

export interface ChildFullDataResponse {
  id: string;
  name: string;
  birth: string;
  userId: string;
  sensoryProfile: SensoryProfileResponseInterface[];
  gender: "MALE" | "FEMALE";
  createdAt: string;
  updatedAt: string;
}
