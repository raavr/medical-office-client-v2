import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormatDateService } from '../../services/format-date.service';
import { DialogBookVisitComponent } from '../dialog-book-visit/dialog-book-visit.component';
import {
  DoctorsDateDto,
  DoctorsMomentDateDto,
  VisitTime,
  VisitReservationDto
} from '../../models/visit-booking';
import { User } from 'src/app/auth/models/user';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-book-visit',
  template: `
    <div class="flex-center">
      <app-book-visit-btn
        [isDoctor]="isDoctor"
        (onBookVisitBtnClicked)="onBookVisitBtnClicked()"
      ></app-book-visit-btn>
      <mat-spinner *ngIf="bookVisitPending" diameter="30"></mat-spinner>
    </div>
  `,
  styles: []
})
export class BookVisitComponent implements OnInit {
  @Input() isDoctor: boolean;
  @Input() visitTimes: VisitTime[];
  @Input() doctors: User[];
  @Input() patients: User[];
  @Input() disabledDates: string[] = [];
  @Input() bookVisitPending: boolean;
  @Output() bookVisit = new EventEmitter<boolean>();
  @Output() dialogClosed = new EventEmitter<VisitReservationDto>();
  @Output() dateChanged = new EventEmitter<DoctorsDateDto>();
  @Output() onPatientNameChanged = new EventEmitter<string>();
  @Output() onDoctorSelected = new EventEmitter<string>();

  dialogRef: MatDialogRef<DialogBookVisitComponent>;

  constructor(
    public dialog: MatDialog,
    private formatDateService: FormatDateService
  ) {}

  ngOnInit() {}

  private setDialogData(prop: string, data: any) {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.data[prop] = data;
    }
  }

  onBookVisitBtnClicked() {
    this.openDialog();
    this.bookVisit.emit(this.isDoctor);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.changesIn(changes, 'visitTimes')) {
      this.setDialogData('visitTimes', this.visitTimes);
    }
    if (this.changesIn(changes, 'doctors')) {
      this.setDialogData('doctors', this.doctors);
    }
    if (this.changesIn(changes, 'patients')) {
      this.setDialogData('patients', this.patients);
    }
    if (this.changesIn(changes, 'disabledDates')) {
      this.setDialogData(
        'disabledDates',
        this.formatDateService.toMomentList(this.disabledDates)
      );
    }
  }

  private changesIn(changes: SimpleChanges, inputProp: string) {
    return (
      changes[inputProp] &&
      changes[inputProp].previousValue != changes[inputProp].currentValue
    );
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogBookVisitComponent, {
      width: '450px',
      data: {
        isDoctor: this.isDoctor,
      }
    });

    this.dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => {
        this.dialogClosed.emit({
          date: this.formatDateService.formatDate(result.date),
          time: result.time,
          userId: result.user.id,
          desc: result.desc
        });
      });

    this.dialogRef.componentInstance.onDateChanged.subscribe(
      (doctorsMomentDate: DoctorsMomentDateDto) =>
        this.dateChanged.emit({
          date: this.formatDateService.formatDate(doctorsMomentDate.date),
          doctorId: doctorsMomentDate.doctorId
        })
    );

    this.dialogRef.componentInstance.onPatientNameTyped.subscribe(name =>
      this.onPatientNameChanged.emit(name)
    );

    this.dialogRef.componentInstance.onDoctorSelected.subscribe(
      (doctorId: string) => this.onDoctorSelected.emit(doctorId)
    );
  }

  ngOnDestroy() {
    this.dialogRef = null;
  }
}
