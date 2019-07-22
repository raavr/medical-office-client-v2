import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-visit-time',
  templateUrl: './visit-time.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../containers/schedule/schedule.component.scss',
    './visit-time.component.scss'
  ]
})
export class VisitTimeComponent {
  visitTimesSet = new Set<string>();
  @Input() times: string[];
  @Input() pending: boolean;
  @Input() unsavedChanges: boolean;
  @Output() update = new EventEmitter<string[]>();
  @Output() initChangesCheck = new EventEmitter<Subject<string[]>>();
  timesChanges$ = new BehaviorSubject<string[]>(this.times);

  timeFormControl = new FormControl('08:00', [Validators.required]);

  private makeListFromSet() {
    this.times = Array.from(this.visitTimesSet).sort();
  }

  addTime() {
    this.visitTimesSet.add(this.timeFormControl.value);
    this.makeListFromSet();
    this.timesChanges$.next(this.times);
  }

  removeTime(time) {
    this.visitTimesSet.delete(time);
    this.makeListFromSet();
    this.timesChanges$.next(this.times);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.times &&
      changes.times.previousValue != changes.times.currentValue
    ) {
      this.visitTimesSet = new Set(this.times);
      this.makeListFromSet();
    }
  }

  ngOnInit() {
    this.initChangesCheck.emit(this.timesChanges$);
  }
}
