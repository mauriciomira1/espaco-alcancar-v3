import { ProfileType } from "./ProfileInterfaces";

export interface ProfessionalDashboardResponse {
  id: string;
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
