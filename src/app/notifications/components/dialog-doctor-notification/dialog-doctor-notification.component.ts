import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Visit } from 'src/app/visits/models/visit';

export interface DialogData {
  notification: Visit;
}

@Component({
  selector: 'app-dialog-doctor-notification',
  templateUrl: './dialog-doctor-notification.component.html',
  styleUrls: ['../../../core/styles/dialog_shared.scss']
})
export class DialogDoctorNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDoctorNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
