import { Component, OnInit } from "@angular/core";
import * as fromRoot from "../../../core/reducers";
import * as fromSchedule from "../../reducers";
import { select, Store } from "@ngrx/store";
import { Observable, Subject, of } from "rxjs";
import {
  GetFullSchedule,
  UpdateVisitTimes,
  UpdateDisabledDates,
  UpdateWeeklyVisitTimes
} from "../../actions/schedule.action";
import { VisitTimeOfDay } from "../../models/visit-datetime.interface";
import { dirtyCheck } from "src/app/core/utils/utils";
import { DirtyComponent } from "../../services/dirty-check.guard";

@Component({
  selector: "app-schedule",
  template: `
    <h2 class="app-title">Grafik wizyt</h2>
    <mat-divider [style.marginBottom.px]="20"></mat-divider>
    <div class="container">
      <div class="flex flex-wrap">
        <app-visit-time
          [times]="times$ | async"
          [pending]="timesPending$ | async"
          [unsavedChanges]="isDirty$[0] | async"
          (update)="updateVisitTimes($event)"
          (initChangesCheck)="initTimesChangesCheck($event)"
          class="flex flex-100 flex-sm-50"
        ></app-visit-time>
        <app-disabled-dates
          [disabledDates]="disabledDates$ | async"
          [pending]="disabledDatesPending$ | async"
          [unsavedChanges]="isDirty$[1] | async"
          (update)="updateDisabledDates($event)"
          (initChangesCheck)="initDatesChangesCheck($event)"
          class="flex flex-100 flex-sm-50"
        ></app-disabled-dates>
      </div>
      <app-day-of-week-list
        [weeklyTimes]="weeklyTimes$ | async"
        [pending]="weeklyTimesPending$ | async"
        [unsavedChanges]="isDirty$[2] | async"
        (update)="updateWeeklyTimes($event)"
        (initChangesCheck)="initWeeklyTimesChangesCheck($event)"
      ></app-day-of-week-list>
    </div>
  `,
  styleUrls: ["../../../core/styles/shared.scss"]
})
export class ScheduleComponent implements OnInit, DirtyComponent {
  times$: Observable<string[]>;
  timesPending$: Observable<boolean>;
  disabledDates$: Observable<string[]>;
  disabledDatesPending$: Observable<boolean>;
  weeklyTimes$: Observable<VisitTimeOfDay[]>;
  weeklyTimesPending$: Observable<boolean>;

  isDirty$: Array<Observable<boolean>> = [];

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.times$ = store.pipe(select(fromSchedule.getVisitTimes));
    this.timesPending$ = store.pipe(select(fromSchedule.getPendingVisitTimes));
    this.disabledDates$ = store.pipe(select(fromSchedule.getDisabledDates));
    this.disabledDatesPending$ = store.pipe(
      select(fromSchedule.getPendingDisabledDates)
    );
    this.weeklyTimes$ = store.pipe(select(fromSchedule.getWeeklyVisitTimes));
    this.weeklyTimesPending$ = store.pipe(
      select(fromSchedule.getPendingWeeklyVisitTimes)
    );
    this.isDirty$ = [of(false), of(false), of(false)];
  }

  updateVisitTimes(times: string[]) {
    this.store.dispatch(new UpdateVisitTimes(times));
  }

  updateDisabledDates(dates: string[]) {
    this.store.dispatch(new UpdateDisabledDates(dates));
  }

  updateWeeklyTimes(weeklyTimes: VisitTimeOfDay[]) {
    this.store.dispatch(new UpdateWeeklyVisitTimes(weeklyTimes));
  }

  initDatesChangesCheck(changes$: Subject<string[]>) {
    this.isDirty$[1] = changes$.pipe(dirtyCheck(this.disabledDates$));
  }

  initTimesChangesCheck(changes$: Subject<string[]>) {
    this.isDirty$[0] = changes$.pipe(dirtyCheck(this.times$));
  }

  initWeeklyTimesChangesCheck(changes$: Subject<VisitTimeOfDay[]>) {
    this.isDirty$[2] = changes$.pipe(dirtyCheck(this.weeklyTimes$));
  }

  ngOnInit() {
    this.store.dispatch(new GetFullSchedule());
  }
}
