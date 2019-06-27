import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  catchError,
  switchMap,
  concatMap,
  withLatestFrom
} from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import * as VisitsActions from '../actions/visits.action';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { VisitService } from '../services/visits.service';
import { VisitsApi } from '../models/visit';
import * as fromVisitsFilter from '../reducers';
import { Store, Action } from '@ngrx/store';
import { VisitFilter } from '../models/visit-filter';
import { of } from 'rxjs';

@Injectable()
export class VisitEffects {
  constructor(
    private actions$: Actions,
    private visitService: VisitService,
    private store: Store<fromVisitsFilter.State>
  ) {}

  @Effect()
  getVisits$ = this.actions$.pipe(
    ofType<VisitsActions.GetVisits>(VisitsActions.VisitsActionTypes.GetVisits),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(this.store.select(fromVisitsFilter.getVisitsFilter))
      )
    ),
    exhaustMap((payload: [Action, VisitFilter]) =>
      this.visitService.getVisits(payload[1]).pipe(
        switchMap((visitsApi: VisitsApi) => [
          new VisitsActions.ResetVisits(),
          new VisitsActions.GetVisitsSuccess(visitsApi)
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new VisitsActions.GetVisitsFailure(),
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
