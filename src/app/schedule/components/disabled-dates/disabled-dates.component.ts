import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ValidatorsService } from 'src/app/core/services/validator.service';
import { FormatDateService } from 'src/app/visits/services/format-date.service';

@Component({
  selector: 'app-disabled-dates',
  templateUrl: './disabled-dates.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../containers/schedule/schedule.component.scss',
    './disabled-dates.component.scss'
  ]
})
export class DisabledDatesComponent {
  datesStrSet = new Set<string>();
  @Input() disabledDates: string[];
  @Input() pending: boolean;
  @Output() update = new EventEmitter<string[]>();

  dateFormControl = new FormControl(moment().add(1, 'day'), [
    Validators.required,
    ValidatorsService.currentDateMatcher
  ]);

  constructor(private formatDateService: FormatDateService) {}

  private makeListFromSet() {
    this.disabledDates = Array.from(this.datesStrSet).sort((a, b) => {
      const mA = moment(a, 'DD/MM/YYYY');
      const mB = moment(b, 'DD/MM/YYYY');

      return mA.isAfter(mB) ? 1 : mA.isSame(mB) ? 0 : -1;
    });
  }

  addDate() {
    this.datesStrSet.add(
      this.formatDateService.formatDate(this.dateFormControl.value)
    );
    this.makeListFromSet();
  }

  removeDate(date) {
    this.datesStrSet.delete(date);
    this.makeListFromSet();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.disabledDates &&
      changes.disabledDates.previousValue != changes.disabledDates.currentValue
    ) {
      this.datesStrSet = new Set(this.disabledDates);
      this.makeListFromSet();
    }
  }
}
