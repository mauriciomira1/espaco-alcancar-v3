enum Role {
  PATIENT = "PATIENT",
  PROFESSIONAL = "PROFESSIONAL",
  ADMIN = "ADMIN",
}

export interface LoginResponseInterface {
  token: string;
  roles: Role[];
}
