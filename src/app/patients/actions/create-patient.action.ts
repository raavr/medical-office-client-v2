import { Action } from '@ngrx/store';
import { User } from '../../auth/models/user';

export enum CreatePatientActionTypes {
  CreatePatient = '[Create Patient] Create Patient',
  CreatePatientSuccess = '[Create Patient] Create Patient Success',
  CreatePatientFailure = '[Create Patient] Create Patient Failure'
}

export class CreatePatient implements Action {
  readonly type = CreatePatientActionTypes.CreatePatient;

  constructor(public payload: User) {}
}

export class CreatePatientSuccess implements Action {
  readonly type = CreatePatientActionTypes.CreatePatientSuccess;

  constructor(public payload: User) {}
}

export class CreatePatientFailure implements Action {
  readonly type = CreatePatientActionTypes.CreatePatientFailure;
}

export type CreatePatientActionUnion =
  | CreatePatient
  | CreatePatientSuccess
  | CreatePatientFailure;
