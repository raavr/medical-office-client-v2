import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user';

export enum AccountsActionTypes {
  GetAccountsSuccess = '[Accounts] Get Accounts Success',
  GetAccountsFailure = '[Accounts] Get Accounts Failure'
}

export class GetAccountsSuccess implements Action {
  readonly type = AccountsActionTypes.GetAccountsSuccess

  constructor(public payload: User[]) { }
}

export class GetAccountsFailure implements Action {
  readonly type = AccountsActionTypes.GetAccountsFailure;
}

export type AccountsActionUnion = 
  | GetAccountsSuccess
  | GetAccountsFailure;