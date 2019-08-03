import { UserRole } from './user';

export interface Token {
  token: string;
}

export interface TokenData {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}