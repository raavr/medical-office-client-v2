import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-visit-rejection',
  templateUrl: './dialog-visit-rejection.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../../core/styles/dialog_shared.scss',
  ]
})
export class DialogVisitRejectionComponent {
  form = this.fb.group({
    reason: this.fb.control('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<DialogVisitRejectionComponent>,
    private fb: FormBuilder
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
