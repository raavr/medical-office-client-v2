import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PatientNotification } from '../../models/patient-notification.interface';

export interface DialogData {
  notification: PatientNotification;
}

@Component({
  selector: 'app-dialog-patient-notification',
  templateUrl: 'dialog-patient-notification.component.html',
  styleUrls: ['../../../core/styles/dialog_shared.scss']
})
export class DialogPatientNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPatientNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onOkClick(): void {
    this.dialogRef.close();
  }
}
