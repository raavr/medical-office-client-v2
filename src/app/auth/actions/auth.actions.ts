import { Action } from '@ngrx/store';
import { Credentials, User } from '../models/user';
import { Token } from '../models/token';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Logout = '[Auth] Logout',
  DecodeTokenSuccess = '[Auth] Decode Token Success',
  TokenValid = '[Auth] Access Token Valid'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Credentials) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: Token) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class DecodeTokenSuccess implements Action {
  readonly type = AuthActionTypes.DecodeTokenSuccess;

  constructor(public payload: User) { }
}

export class TokenValid implements Action {
  readonly type = AuthActionTypes.TokenValid;

  constructor(public payload: Token) { }
}

export type AuthActionUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | DecodeTokenSuccess;