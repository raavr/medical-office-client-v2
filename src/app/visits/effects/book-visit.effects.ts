import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, switchMap, map } from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import * as BookVisitActions from '../actions/book-visit.action';
import * as VisitsActions from '../actions/visits.action';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { BookVisitService } from '../services/book-visit.service';
import {
  VisitTime,
  VisitReservationDto,
  DisabledDates,
  DoctorsDateDto
} from '../models/visit-booking';
import { User } from 'src/app/auth/models/user';

@Injectable()
export class BookVisitEffects {
  constructor(
    private actions$: Actions,
    private bookVisitService: BookVisitService
  ) {}

  @Effect()
  getUnavailableDates$ = this.actions$.pipe(
    ofType<BookVisitActions.GetUnavailableDates>(
      BookVisitActions.BookVisitActionTypes.GetUnavailableDates
    ),
    map(action => action.payload),
    exhaustMap((payload: string) =>
      this.bookVisitService.getUnavailableDates(payload).pipe(
        map(
          (disabledDates: DisabledDates) =>
            new BookVisitActions.GetUnavailableDatesSuccess(disabledDates)
        ),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
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
  getAvailableTimes$ = this.actions$.pipe(
    ofType<BookVisitActions.GetAvailableTime>(
      BookVisitActions.BookVisitActionTypes.GetAvailableTime
    ),
    map(action => action.payload),
    exhaustMap((payload: DoctorsDateDto) =>
      this.bookVisitService.getAvailableTimes(payload).pipe(
        map(
          (visitTimes: VisitTime[]) =>
            new BookVisitActions.GetAvailableTimeSuccess(visitTimes)
        ),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
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
  getPatientsByName$ = this.actions$.pipe(
    ofType<BookVisitActions.GetPatientsByName>(
      BookVisitActions.BookVisitActionTypes.GetPatientsByName
    ),
    map(action => action.payload),
    exhaustMap((payload: string) =>
      this.bookVisitService.getPatientsByName(payload).pipe(
        map(
          (patients: User[]) =>
            new BookVisitActions.GetPatientsByNameSuccess(patients)
        ),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
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
  getDoctors$ = this.actions$.pipe(
    ofType<BookVisitActions.GetDoctors>(
      BookVisitActions.BookVisitActionTypes.GetDoctors
    ),
    exhaustMap(() =>
      this.bookVisitService.getDoctors().pipe(
        map(
          (doctors: User[]) =>
            new BookVisitActions.GetDoctorsSuccess(doctors)
        ),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
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
  bookVisit$ = this.actions$.pipe(
    ofType<BookVisitActions.BookVisit>(
      BookVisitActions.BookVisitActionTypes.BookVisit
    ),
    map(action => action.payload),
    exhaustMap((payload: VisitReservationDto) =>
      this.bookVisitService.bookVisit(payload).pipe(
        switchMap(
          ({ message }) => [
            new AlertActions.AlertShow({
              message,
              alertType: ALERT_TYPE.SUCCESS
            }),
            new VisitsActions.GetVisits(),
            new BookVisitActions.BookVisitSuccess()
          ]
          
          ),
          catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              }),
              new VisitsActions.GetVisits(),
              new BookVisitActions.BookVisitFailure()
            ],
            status
          )
        )
      )
    )
  );
}
