import { Action } from '@ngrx/store';
import { PasswordToken } from '../models/token';

export enum ResetPasswordActionTypes {
  ResetPasswordRequest = '[Auth] Reset Password Request',
  ResetPasswordRequestSuccess = '[Auth] Reset Password Request Success',
  ResetPasswordRequestFailure = '[Auth] Reset Password Request Failure',
  ResetPassword = '[Auth] Reset Password',
  ResetPasswordSuccess = '[Auth] Reset Password Success',
  ResetPasswordFailure = '[Auth] Reset Password Failure',
  TokenValid = '[Auth] Password Token Valid',
  TokenInvalid = '[Auth] Password Token Invalid'
}

export class ResetPasswordRequest implements Action {
  readonly type = ResetPasswordActionTypes.ResetPasswordRequest;

  constructor(public payload: string) {}
}

export class ResetPasswordRequestSuccess implements Action {
  readonly type = ResetPasswordActionTypes.ResetPasswordRequestSuccess;
}

export class ResetPasswordRequestFailure implements Action {
  readonly type = ResetPasswordActionTypes.ResetPasswordRequestFailure;
}

export class ResetPassword implements Action {
  readonly type = ResetPasswordActionTypes.ResetPassword;

  constructor(public payload: PasswordToken) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = ResetPasswordActionTypes.ResetPasswordSuccess;
}

export class ResetPasswordFailure implements Action {
  readonly type = ResetPasswordActionTypes.ResetPasswordFailure;
}

export class TokenValid implements Action {
  readonly type = ResetPasswordActionTypes.TokenValid;

  constructor(public payload: string) {}
}

export class TokenInvalid implements Action {
  readonly type = ResetPasswordActionTypes.TokenInvalid;
}

export type ResetPasswordActionUnion =
  | ResetPasswordRequest
  | ResetPasswordRequestSuccess
  | ResetPasswordRequestFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | TokenValid
  | TokenInvalid;
