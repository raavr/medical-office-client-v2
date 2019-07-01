import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromVisitsFilter from '../../reducers';
import { delay } from 'rxjs/operators';
import { VisitType } from '../../models/visit';

@Component({
  selector: 'app-visits',
  template: `
    <h2>Moje wizyty</h2>
    <mat-divider></mat-divider>
    <nav mat-tab-nav-bar>
      <a
        mat-tab-link
        *ngFor="let link of links"
        [active]="activeLink === link.type"
        [routerLink]="['/dashboard/visits', link.type]"
      >
        {{ link.label }}
      </a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class VisitsComponent {
  links = [
    { label: 'Aktualne', type: VisitType.CURRENT },
    { label: 'Historyczne', type: VisitType.PAST }
  ];
  activeLink: string;

  constructor(
    private store: Store<fromVisitsFilter.State>,
  ) {
    store
      .pipe(
        select(fromVisitsFilter.getVisitsFilterType),
        delay(0)
      )
      .subscribe(type => (this.activeLink = type));
  }

}
