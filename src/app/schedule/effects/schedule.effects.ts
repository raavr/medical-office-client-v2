import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ScheduleService } from '../services/schedule.service';
import * as ScheduleActions from '../actions/schedule.action';
import {
  VisitDatetime,
  VisitTimeOfDay
} from '../models/visit-datetime.interface';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import * as AlertActions from '../../core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';

@Injectable()
export class ScheduleEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService
  ) {}

  @Effect()
  getFullSchedule$ = this.actions$.pipe(
    ofType<ScheduleActions.GetFullSchedule>(
      ScheduleActions.ScheduleActionTypes.GetFullSchedule
    ),
    exhaustMap(() =>
      this.scheduleService.getFullVisitSchedule().pipe(
        switchMap((visitDatetimes: VisitDatetime) => [
          new ScheduleActions.SetVisitTimes(visitDatetimes.times),
          new ScheduleActions.SetDisabledDates(visitDatetimes.disabledDates),
          new ScheduleActions.SetWeeklyVisitTimes(
            visitDatetimes.weeklyVisitTimes
          ),
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new ScheduleActions.GetFullScheduleFailure(),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              })
            ],
            status
          )
        )
      )
    )
  );

  @Effect()
  updateVisitTimes$ = this.actions$.pipe(
    ofType<ScheduleActions.UpdateVisitTimes>(
      ScheduleActions.ScheduleActionTypes.UpdateVisitTimes
    ),
    map(action => action.payload),
    exhaustMap((times: string[]) =>
      this.scheduleService.updateVisitTimes(times).pipe(
        switchMap(({ message }) => [
          new ScheduleActions.GetFullSchedule(false),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new ScheduleActions.UpdateVisitTimesFailure(),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              })
            ],
            status
          )
        )
      )
    )
  );

  @Effect()
  updateDisabledDates$ = this.actions$.pipe(
    ofType<ScheduleActions.UpdateDisabledDates>(
      ScheduleActions.ScheduleActionTypes.UpdateDisabledDates
    ),
    map(action => action.payload),
    exhaustMap((dates: string[]) =>
      this.scheduleService.updateDisabledDates(dates).pipe(
        switchMap(({ message }) => [
          new ScheduleActions.SetDisabledDates(dates),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new ScheduleActions.UpdateDisabledDatesFailure(),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              })
            ],
            status
          )
        )
      )
    )
  );

  @Effect()
  updateWeeklyTimes$ = this.actions$.pipe(
    ofType<ScheduleActions.UpdateWeeklyVisitTimes>(
      ScheduleActions.ScheduleActionTypes.UpdateWeeklyVisitTimes
    ),
    map(action => action.payload),
    exhaustMap((weeklyTimes: VisitTimeOfDay[]) =>
      this.scheduleService.updateWeeklyVisitTimes(weeklyTimes).pipe(
        switchMap(({ message }) => [
          new ScheduleActions.SetWeeklyVisitTimes(weeklyTimes),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new ScheduleActions.UpdateWeeklyVisitTimesFailure(),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              })
            ],
            status
          )
        )
      )
    )
  );
}
