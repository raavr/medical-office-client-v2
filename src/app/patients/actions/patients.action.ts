import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user';
import { PatientsApi } from '../models/patient';

export enum PatientsActionTypes {
  GetPatients = '[Patients] Get Patients',
  GetPatientsSuccess = '[Patients] Get Patients Success',
  GetPatientsFailure = '[Patients] Get Patients Failure',
  ResetPatients = '[Patients] Reset Patients',
  RemovePatient = '[Patients] Remove Patient',
  RemovePatientSuccess = '[Patients] Remove Patient Success',
  RemovePatientFailure = '[Patients] Remove Patient Failure'
}

export class GetPatients implements Action {
  readonly type = PatientsActionTypes.GetPatients;
}

export class GetPatientsSuccess implements Action {
  readonly type = PatientsActionTypes.GetPatientsSuccess;

  constructor(public payload: PatientsApi) {}
}

export class GetPatientsFailure implements Action {
  readonly type = PatientsActionTypes.GetPatientsFailure;
}

export class ResetPatients implements Action {
  readonly type = PatientsActionTypes.ResetPatients;

  constructor(public payload: User) {}
}

export class RemovePatient implements Action {
  readonly type = PatientsActionTypes.RemovePatient;

  constructor(public payload: User) {}
}

export class RemovePatientSuccess implements Action {
  readonly type = PatientsActionTypes.RemovePatientSuccess;

  constructor(public payload: User) {}
}

export class RemovePatientFailure implements Action {
  readonly type = PatientsActionTypes.RemovePatientFailure;
}

export type PatientsActionUnion =
  | GetPatients
  | GetPatientsSuccess
  | GetPatientsFailure
  | ResetPatients
  | RemovePatient
  | RemovePatientSuccess
  | RemovePatientFailure;
