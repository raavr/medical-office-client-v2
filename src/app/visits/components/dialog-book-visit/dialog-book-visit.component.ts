import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { VisitTime, DoctorsMomentDateDto } from '../../models/visit-booking';
import { User } from 'src/app/auth/models/user';
import { distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';
import { ValidatorsService } from 'src/app/core/services/validator.service';
import * as moment from 'moment';
import { Moment } from 'moment';

export interface DialogData {
  isDoctor: boolean;
  disabledDates: Moment[];
  date: Moment;
  visitTimes: VisitTime[];
  patients: User[];
  doctors: User[];
}

@Component({
  selector: 'app-dialog-book-visit',
  templateUrl: './dialog-book-visit.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../../core/styles/dialog_shared.scss',
  ]
})
export class DialogBookVisitComponent implements OnInit {
  onDateChanged = new EventEmitter<DoctorsMomentDateDto>();
  onDoctorSelected = new EventEmitter<string>();
  onPatientNameTyped = new EventEmitter<string>();
  form = this.fb.group({
    date: this.fb.control('', [
      Validators.required,
      ValidatorsService.currentDateMatcher
    ]),
    time: this.fb.control('', Validators.required),
    user: this.fb.control(
      '',
      this.data.isDoctor
        ? [Validators.required, ValidatorsService.autocompleteMatcher]
        : Validators.required
    ),
    desc: this.fb.control('')
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBookVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  displayFn(user?: User): string | undefined {
    return user ? `${user.name} ${user.surname}` : undefined;
  }

  dateFilter = (d: Moment): boolean => {
    return (
      !!this.data.disabledDates &&
      !this.data.disabledDates.some((el: Moment) => moment(el).isSame(d))
    );
  };

  resetTimeFormAndData() {
    this.form.get('time').reset();
    this.data.visitTimes = [];
  }

  resetPatientsData() {
    this.data.patients = [];
  }

  ngOnInit() {
    this.form
      .get('date')
      .valueChanges.pipe(filter(_ => this.form.get('date').valid))
      .subscribe((newDate: Moment) => {
        this.resetTimeFormAndData();

        this.onDateChanged.emit({
          date: newDate,
          doctorId: this.data.isDoctor ? null : this.form.get('user').value.id
        });
      });

    this.form
      .get('user')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(user => {
        if (this.data.isDoctor) {
          if (typeof user === 'string' && !!user) {
            this.onPatientNameTyped.emit(user);
          }
          this.resetPatientsData();
        } else {
          this.onDoctorSelected.emit(user.id);
        }
      });
  }
}
