export interface Credentials {
  email: string;
  password: string;
}

type UserRole = 'doctor' | 'patient';

export interface User {
  sub: string;
  name?: string;
  surname?: string;
  role?: UserRole;
  email?: string;
  phone?: string;
  avatar?: string;
}