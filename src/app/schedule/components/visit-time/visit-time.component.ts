import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-visit-time',
  templateUrl: './visit-time.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    './visit-time.component.scss'
  ]
})
export class VisitTimeComponent implements OnInit {
  visitTimesSet = new Set<string>();
  @Input() times: string[];
  @Input() pending: boolean;
  @Output() update = new EventEmitter<string[]>();

  timeFormControl = new FormControl('', [Validators.required]);

  private makeListFromSet() {
    this.times = Array.from(this.visitTimesSet).sort();
  }

  addTime() {
    this.visitTimesSet.add(this.timeFormControl.value);
    this.makeListFromSet();
  }

  removeTime(time) {
    this.visitTimesSet.delete(time);
    this.makeListFromSet();
  }

  ngOnChanges() {
    this.visitTimesSet = new Set(this.times);
    this.makeListFromSet();
  }

  ngOnInit() {
    this.timeFormControl.setValue('08:00');
  }
}
