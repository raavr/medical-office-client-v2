import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import {
  VisitTimeOfDay,
  SelectedVisitTime
} from '../../models/visit-datetime.interface';
import { DateAdapter, MatSlideToggleChange } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-day-of-week',
  templateUrl: './day-of-week.component.html',
  styleUrls: ['./day-of-week.component.scss'],
})
export class DayOfWeekComponent implements OnInit {
  @Input() visitTime: VisitTimeOfDay;
  @Output() onWeeklyTimesChanged = new EventEmitter<null>();
  dayOfWeekName: string;
  allSelected: boolean;
  constructor(private dateAdapter: DateAdapter<any>) {}

  ngOnInit() {
    this.setDayOfWeekName();
    this.setAllSelected();
  }

  private setDayOfWeekName() {
    const dayOfWeekName = (this.dateAdapter as MomentDateAdapter).format(
      moment().day(this.visitTime.dayOfWeek),
      'dddd'
    );
    this.dayOfWeekName = `${dayOfWeekName[0].toUpperCase()}${dayOfWeekName.slice(
      1
    )}`;
  }

  private setAllSelected() {
    this.allSelected = this.visitTime.visitTime.every(el => el.selected);
  }

  selectAll() {
    this.allSelected = !this.allSelected;
    this.visitTime.visitTime.forEach(
      elem => (elem.selected = this.allSelected)
    );
    this.onWeeklyTimesChanged.emit();
  }

  changeSelected(change: MatSlideToggleChange, time: SelectedVisitTime) {
    time.selected = change.checked;
    this.onWeeklyTimesChanged.emit();
  }

  checkboxLabel() {
    return `${this.allSelected ? 'select' : 'deselect'} all`;
  }
}
