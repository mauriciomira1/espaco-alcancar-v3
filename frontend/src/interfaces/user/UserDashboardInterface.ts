// src/interfaces/user/userDashboardResponse.ts

export interface Address {
  address: string;
  city: string;
  complement: string;
}

export interface ProfileType {
  patient: boolean;
  professional: boolean;
  admin: boolean;
}

export interface Child {
  id: number;
  name: string;
  birth: string; // Use string para datas, pode ser ajustado para Date se necessário
  userEntity: number; // ou uma interface UserEntity se você quiser detalhes do usuário
  sensoryProfile: any[]; // ou um tipo mais específico se você tiver uma interface para SensoryProfile
  gender: "MALE" | "FEMALE"; // ou string se você estiver usando um tipo de string para gênero
}

export interface UserDashboardInterface {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  children: any[]; // ou um tipo mais específico se você tiver uma interface para crianças
  gender: string; // Pode ser um enum se houver um conjunto fixo de gêneros
  address: Address;
  profileType: ProfileType;
}
