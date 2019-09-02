import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 [style.marginBottom.px]="5">404. Nie znaleziono</h2>
    <p [style.marginBottom.px]="30">Ooops! Nic tu nie ma...</p>
    <button mat-raised-button color="primary" routerLink="/">
      Strona główna
    </button>
  `,
  styles: [
    `
      :host {
        text-align: center;
        width: 100%;
      }
    `
  ]
})
export class NotFoundComponent {}
