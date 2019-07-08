import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-dialog-confirmation',
  template: `
    <div mat-dialog-content [style.marginBottom.px]="15">
      Czy na pewno chcesz usunąć {{data.title}}?
    </div>
    <footer mat-dialog-actions class="dialog__footer">
      <button mat-raised-button color="primary" (click)="onCancelClick()">Anuluj</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="'OK'" cdkFocusInitial>Tak, jestem pewien</button>
    </footer>
  `,
  styleUrls: ['../../../core/styles/dialog_shared.scss']
})
export class DialogConfirmationComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
