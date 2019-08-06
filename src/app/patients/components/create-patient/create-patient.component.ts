import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { filter } from 'rxjs/operators';
import { DialogCreatePatientComponent } from '../dialog-create-patient/dialog-create-patient.component';

@Component({
  selector: 'app-create-patient',
  template: `
    <div class="flex-center">
      <button mat-raised-button color="accent" (click)="openDialog()" class="dialog__btn">
        Utwórz konto pacjenta
      </button>
      <mat-spinner *ngIf="pending" diameter="30"></mat-spinner>
    </div>
  `,
  styleUrls: [
    '../../../core/styles/dialog_shared.scss'
  ]
})
export class CreatePatientComponent implements OnInit {
  @Input() pending: boolean;
  @Output() createPatient = new EventEmitter<boolean>();

  dialogRef: MatDialogRef<DialogCreatePatientComponent>;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {}

  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogCreatePatientComponent, {
      width: '450px'
    });

    this.dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => {
        this.createPatient.emit(result);
      });
  }

  ngOnDestroy() {
    this.dialogRef = null;
  }
}
