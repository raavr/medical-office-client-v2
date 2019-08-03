export interface Credentials {
  email: string;
  password: string;
}

export type UserRole = 'doctor' | 'patient';

export interface User {
  id: string;
  name?: string;
  surname?: string;
  role?: UserRole;
  email?: string;
  phone?: string;
  avatar?: string;
}