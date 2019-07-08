import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Visit } from '../../models/visit';

export interface DialogData {
  visit: Visit;
  isDoctor: boolean;
}

@Component({
  selector: 'app-dialog-visit-more',
  templateUrl: './dialog-visit-more.component.html',
  styleUrls: [
    '../../../core/styles/dialog_shared.scss',
    './dialog-visit-more.component.scss'
  ]
})
export class DialogVisitMoreComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogVisitMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onOkClick(): void {
    this.dialogRef.close();
  }
}
