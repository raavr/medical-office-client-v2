import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-patient',
  templateUrl: './dialog-create-patient.component.html',
  styleUrls: [
    '../../../core/styles/card_shared.scss',
    '../../../core/styles/dialog_shared.scss'
  ]
})
export class DialogCreatePatientComponent {
  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    surname: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.email, Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCreatePatientComponent>,
    private fb: FormBuilder
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
