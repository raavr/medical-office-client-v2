import { Component, Input, EventEmitter, Output } from '@angular/core';
import { VisitTimeOfDay } from '../../models/visit-datetime.interface';
import { BehaviorSubject } from 'rxjs';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-day-of-week-list',
  templateUrl: './day-of-week-list.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../containers/schedule/schedule.component.scss',
    './day-of-week-list.component.scss'
  ],
})
export class DayOfWeekListComponent {
  _weeklyTimes: VisitTimeOfDay[];
  @Input() set weeklyTimes(times: VisitTimeOfDay[]) {
    this._weeklyTimes = cloneDeep(times);
  };
  @Input() pending: boolean;
  @Input() unsavedChanges: boolean;
  @Output() initChangesCheck = new EventEmitter<BehaviorSubject<VisitTimeOfDay[]>>();
  @Output() update = new EventEmitter<VisitTimeOfDay[]>();
  weeklyTimesChanges$ = new BehaviorSubject<VisitTimeOfDay[]>(this._weeklyTimes);

  oneOfWeeklyTimesChanged() {
    this.weeklyTimesChanges$.next(this._weeklyTimes);
  }

  ngOnInit() {
    this.initChangesCheck.emit(this.weeklyTimesChanges$);
  }
}
