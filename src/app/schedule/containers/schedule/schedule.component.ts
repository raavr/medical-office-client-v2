import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import * as fromSchedule from '../../reducers';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Alert } from 'src/app/core/model/alert.interface';
import {
  GetFullSchedule,
  UpdateVisitTimes,
  UpdateDisabledDates
} from '../../actions/schedule.action';

@Component({
  selector: 'app-schedule',
  template: `
    <div class="flex flex-wrap">
      <app-visit-time
        [times]="times$ | async"
        [pending]="timesPending$ | async"
        (update)="updateVisitTimes($event)"
        class="flex flex-100 flex-sm-50"
      ></app-visit-time>
        <app-disabled-dates
          [disabledDates]="disabledDates$ | async"
          [pending]="disabledDatesPending$ | async"
          (update)="updateDisabledDates($event)"
          class="flex flex-100 flex-sm-50"
      ></app-disabled-dates>
    </div>
  `
})
export class ScheduleComponent implements OnInit {
  alert$: Observable<Alert>;
  times$: Observable<string[]>;
  timesPending$: Observable<boolean>;
  disabledDates$: Observable<string[]>;
  disabledDatesPending$: Observable<boolean>;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private alert: AlertFactoryService
  ) {
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
    this.times$ = store.pipe(select(fromSchedule.getVisitTimes));
    this.timesPending$ = store.pipe(select(fromSchedule.getPendingVisitTimes));
    this.disabledDates$ = store.pipe(select(fromSchedule.getDisabledDates));
    this.disabledDatesPending$ = store.pipe(
      select(fromSchedule.getPendingDisabledDates)
    );
  }

  updateVisitTimes(times: string[]) {
    this.store.dispatch(new UpdateVisitTimes(times));
  }

  updateDisabledDates(dates: string[]) {
    this.store.dispatch(new UpdateDisabledDates(dates));
  }

  ngOnInit() {
    this.store.dispatch(new GetFullSchedule());
    this.alert$
      .pipe(
        takeUntil(this.alertUnsub$),
        filter(payload => !!payload && !!payload.message)
      )
      .subscribe(payload =>
        this.alert.create(payload.message, { type: payload.alertType })
      );
  }
}
