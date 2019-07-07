import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-visit-btn',
  template: `
    <button mat-raised-button color="accent" (click)="onBookVisitBtnClicked.emit()">
      Zapisz {{ isDoctor ? 'pacjenta' : 'się' }} na wizytę
    </button>
  `,
  styleUrls: ['./book-visit-btn.component.scss']
})
export class BookVisitBtnComponent {
  @Input() isDoctor: boolean;
  @Output() onBookVisitBtnClicked = new EventEmitter<any>();
}
