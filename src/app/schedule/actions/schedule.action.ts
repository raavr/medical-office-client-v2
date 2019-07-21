import { Action } from '@ngrx/store';
import { VisitTimeOfDay } from '../models/visit-datetime.interface';

export enum ScheduleActionTypes {
  SetVisitTimes = '[Schedule] Set Visit Times',
  UpdateVisitTimes = '[Schedule] Update Visit Times',
  UpdateVisitTimesFailure = '[Schedule] Update Visit Times Failure',
  SetDisabledDates = '[Schedule] Set Disabled Dates',
  UpdateDisabledDates = '[Schedule] Update Disabled Dates',
  UpdateDisabledDatesFailure = '[Schedule] Update Disabled Dates Failure',
  SetWeeklyVisitTimes = '[Schedule] Set Weekly Visit Times',
  UpdateWeeklyVisitTimes = '[Schedule] Update Weekly Visit Times',
  UpdateWeeklyVisitTimesFailure = '[Schedule] Update Weekly Visit Times Failure',
  GetFullSchedule = '[Schedule] Get Schedule',
  ResetFullSchedule = '[Schedule] Reset Schedule',
  GetFullScheduleFailure = '[Schedule] Get Schedule Failure'
}

export class GetFullSchedule implements Action {
  readonly type = ScheduleActionTypes.GetFullSchedule;

  constructor(public disableDatesPending: boolean = true) {}
}

export class ResetFullSchedule implements Action {
  readonly type = ScheduleActionTypes.ResetFullSchedule;
}

export class SetVisitTimes implements Action {
  readonly type = ScheduleActionTypes.SetVisitTimes;

  constructor(public payload: string[]) {}
}

export class UpdateVisitTimes implements Action {
  readonly type = ScheduleActionTypes.UpdateVisitTimes;

  constructor(public payload: string[]) {}
}

export class UpdateVisitTimesFailure implements Action {
  readonly type = ScheduleActionTypes.UpdateVisitTimesFailure;
}

export class SetDisabledDates implements Action {
  readonly type = ScheduleActionTypes.SetDisabledDates;

  constructor(public payload: string[]) {}
}

export class UpdateDisabledDates implements Action {
  readonly type = ScheduleActionTypes.UpdateDisabledDates;

  constructor(public payload: string[]) {}
}

export class UpdateDisabledDatesFailure implements Action {
  readonly type = ScheduleActionTypes.UpdateDisabledDatesFailure;
}

export class SetWeeklyVisitTimes implements Action {
  readonly type = ScheduleActionTypes.SetWeeklyVisitTimes;

  constructor(public payload: VisitTimeOfDay[]) {}
}

export class UpdateWeeklyVisitTimes implements Action {
  readonly type = ScheduleActionTypes.UpdateWeeklyVisitTimes;

  constructor(public payload: VisitTimeOfDay[]) {}
}

export class UpdateWeeklyVisitTimesFailure implements Action {
  readonly type = ScheduleActionTypes.UpdateWeeklyVisitTimesFailure;
}

export class GetFullScheduleFailure implements Action {
  readonly type = ScheduleActionTypes.GetFullScheduleFailure;
}

export type ScheduleActionUnion =
  | SetVisitTimes
  | UpdateVisitTimes
  | UpdateVisitTimesFailure
  | SetDisabledDates
  | UpdateDisabledDates
  | UpdateDisabledDatesFailure
  | SetWeeklyVisitTimes
  | UpdateWeeklyVisitTimes
  | UpdateWeeklyVisitTimesFailure
  | GetFullSchedule
  | ResetFullSchedule
  | GetFullScheduleFailure
  | GetFullScheduleFailure;
