import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert">
      <span>{{data}}</span>
      <div class="alert__action"><button mat-button (click)="dismiss()">Zamknij</button></div>
    </div>
  `,
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {}

  public dismiss(): void {
    this.snackBar.dismiss();
  }
}
