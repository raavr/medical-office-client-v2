import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-row',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: [`./filter-row.component.scss`]
})
export class FilterRowComponent {}
