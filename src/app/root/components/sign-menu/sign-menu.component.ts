import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-menu',
  template: `
    <ng-container *ngIf="!loggedIn">
      <button
        mat-button
        color="accent"
        routerLink="/login"
        [style.marginRight.px]="5"
      >
        Zaloguj
      </button>
      <button mat-raised-button color="accent" routerLink="/signup">
        Zarejestruj się
      </button>
    </ng-container>
  `,
  styles: []
})
export class SignMenuComponent {
  @Input() loggedIn: boolean;
}
