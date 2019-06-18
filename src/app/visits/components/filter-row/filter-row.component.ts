import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-row',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: flex;
        border-width: 0;
        border-bottom-width: 1px;
        border-style: solid;
        align-items: center;
        box-sizing: border-box;
        border-color: rgba(255, 255, 255, 0.12);
      }
    `
  ],
})
export class FilterRowComponent {

}
