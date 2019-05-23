import { User } from './user';

export interface Token {
  token: string;
}

export interface TokenData extends User {
  iat: number;
  exp: number;
}