import { ProfileType } from "./Profile";

export interface ProfessionalDashboardResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  active: boolean;
  birth: string;
  registerNumber: string;
  occupation: string;
  profileType: ProfileType;
}
