import { Action } from '@ngrx/store';
import { Passwords } from '../model/passwords';

export enum PasswordActionTypes {
  ChangePassword = '[Password] Change Password',
  ChangePasswordFailure = '[Password] Change Password Failure',
  ChangePasswordSuccess = '[Password] Change Password Success',
}

export class ChangePassword implements Action {
  readonly type = PasswordActionTypes.ChangePassword;

  constructor(public payload: Passwords) { }
}

export class ChangePasswordFailure implements Action {
  readonly type = PasswordActionTypes.ChangePasswordFailure;
}

export class ChangePasswordSuccess implements Action {
  readonly type = PasswordActionTypes.ChangePasswordSuccess;
}

export type PasswordActionUnion = 
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailure;