import { Action } from '@ngrx/store';
import { Credentials, User } from '../models/user';
import { Token } from '../models/token';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  AutoLogin = '[Auth] Auto Login',
  Logout = '[Auth] Logout',
  DecodeToken = '[Auth] Decode Token',
  DecodeTokenSuccess = '[Auth] Decode Token Success',
  TokenInvalid = '[Auth] Token Invalid'
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

  constructor(public payload: any) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AutoLogin;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class DecodeToken implements Action {
  readonly type = AuthActionTypes.DecodeToken;

  constructor(public payload: Token) { }
}

export class DecodeTokenSuccess implements Action {
  readonly type = AuthActionTypes.DecodeTokenSuccess;

  constructor(public payload: User) { }
}

export class TokenInvalid implements Action {
  readonly type = AuthActionTypes.TokenInvalid;
}

export type AuthActionUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | AutoLogin
  | Logout
  | DecodeToken
  | DecodeTokenSuccess
  | TokenInvalid;