import { Component, Input, EventEmitter, Output } from '@angular/core';
import { VisitTimeOfDay } from '../../models/visit-datetime.interface';

@Component({
  selector: 'app-day-of-week-list',
  templateUrl: './day-of-week-list.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../containers/schedule/schedule.component.scss',
    './day-of-week-list.component.scss'
  ]
})
export class DayOfWeekListComponent {
  @Input() weeklyTimes: VisitTimeOfDay[];
  @Input() pending: boolean;
  @Output() update = new EventEmitter<VisitTimeOfDay[]>();
}
