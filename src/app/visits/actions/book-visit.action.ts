import { Action } from '@ngrx/store';
import {
  VisitTime,
  VisitReservationDto,
  DisabledDates,
  DoctorsDateDto
} from '../models/visit-booking';
import { User } from 'src/app/auth/models/user';

export enum BookVisitActionTypes {
  GetUnavailableDates = '[Get Unavailable Dates] Get Unavailable Dates',
  GetUnavailableDatesSuccess = '[Get Unavailable Dates] Get Unavailable Dates Success',
  GetUnavailableDatesFailure = '[Get Unavailable Dates] Get Unavailable Dates Failure',
  GetAvailableTime = '[Get Available Time] Get Available Time',
  GetAvailableTimeSuccess = '[Get Available Time] Get Available Time Success',
  GetAvailableTimeFailure = '[Get Available Time] Get Available Time Failure',
  GetPatientsByName = '[Get Patients] Get Patients By Name',
  GetPatientsByNameSuccess = '[Get Patients] Get Patients By Name Success',
  GetPatientsByNameFailure = '[Get Patients] Get Patients By Name Failure',
  GetDoctors = '[Get Doctors] Get Doctors',
  GetDoctorsSuccess = '[Get Doctors] Get Doctors Success',
  GetDoctorsFailure = '[Get Doctors] Get Doctors Failure',
  BookVisit = '[Book Visit] Book Visit',
  BookVisitSuccess = '[Book Visit] Book Visit Success',
  BookVisitFailure = '[Book Visit] Book Visit Failure'
}

export class GetUnavailableDates implements Action {
  readonly type = BookVisitActionTypes.GetUnavailableDates;

  constructor(public payload?: string) {}
}

export class GetUnavailableDatesSuccess implements Action {
  readonly type = BookVisitActionTypes.GetUnavailableDatesSuccess;

  constructor(public payload: DisabledDates) {}
}

export class GetUnavailableDatesFailure implements Action {
  readonly type = BookVisitActionTypes.GetUnavailableDatesFailure;
}

export class GetAvailableTime implements Action {
  readonly type = BookVisitActionTypes.GetAvailableTime;

  constructor(public payload: DoctorsDateDto) {}
}

export class GetAvailableTimeSuccess implements Action {
  readonly type = BookVisitActionTypes.GetAvailableTimeSuccess;

  constructor(public payload: VisitTime[]) {}
}

export class GetAvailableTimeFailure implements Action {
  readonly type = BookVisitActionTypes.GetAvailableTimeFailure;
}

export class GetPatientsByName implements Action {
  readonly type = BookVisitActionTypes.GetPatientsByName;

  constructor(public payload: string) {}
}

export class GetPatientsByNameSuccess implements Action {
  readonly type = BookVisitActionTypes.GetPatientsByNameSuccess;

  constructor(public payload: User[]) {}
}

export class GetPatientsByNameFailure implements Action {
  readonly type = BookVisitActionTypes.GetPatientsByNameFailure;
}

export class GetDoctors implements Action {
  readonly type = BookVisitActionTypes.GetDoctors;
}

export class GetDoctorsSuccess implements Action {
  readonly type = BookVisitActionTypes.GetDoctorsSuccess;

  constructor(public payload: User[]) {}
}

export class GetDoctorsFailure implements Action {
  readonly type = BookVisitActionTypes.GetDoctorsFailure;
}

export class BookVisit implements Action {
  readonly type = BookVisitActionTypes.BookVisit;

  constructor(public payload: VisitReservationDto) {}
}

export class BookVisitSuccess implements Action {
  readonly type = BookVisitActionTypes.BookVisitSuccess;
}

export class BookVisitFailure implements Action {
  readonly type = BookVisitActionTypes.BookVisitFailure;
}

export type BookVisitActionUnion =
  | GetUnavailableDates
  | GetUnavailableDatesSuccess
  | GetUnavailableDatesFailure
  | GetAvailableTime
  | GetAvailableTimeSuccess
  | GetAvailableTimeFailure
  | GetPatientsByName
  | GetPatientsByNameSuccess
  | GetPatientsByNameFailure
  | GetDoctors
  | GetDoctorsSuccess
  | GetDoctorsFailure
  | BookVisit
  | BookVisitSuccess
  | BookVisitFailure;
