// src/interfaces/user/userDashboardResponse.ts

import { ChildFullDataResponse } from "./ChildInterfaces";
import { ProfileType } from "./ProfileInterfaces";

export interface Address {
  address: string;
  city: string;
  complement: string;
}

export interface UserDashboardInterface {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  relationship: "FATHER" | "MOTHER" | "OTHER"; // Pode ser um enum se houver um conjunto fixo de gêneros
  address: Address;
  profileType: ProfileType;
  createdAt: string;
}
