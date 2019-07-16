import { Action } from '@ngrx/store';
import { SignupData } from '../models/signup';

export enum SignupActionTypes {
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup Success',
  SignupFailure = '[Auth] Signup Failure',
}

export class Signup implements Action {
  readonly type = SignupActionTypes.Signup;

  constructor(public payload: SignupData) { }
}

export class SignupSuccess implements Action {
  readonly type = SignupActionTypes.SignupSuccess;
}

export class SignupFailure implements Action {
  readonly type = SignupActionTypes.SignupFailure;
}

export type SignupActionUnion =
  | Signup
  | SignupSuccess
  | SignupFailure;