import { Component } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-dashboard-menu *ngIf="isDoctor"></app-dashboard-menu>
    <div [class.dashboard__router]="isDoctor">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isDoctor: boolean;
  private unsub$ = new Subject<any>();
  
  constructor(private store: Store<fromRoot.State>) {
    store
      .pipe(
        select(fromAuth.isDoctor),
        takeUntil(this.unsub$)
      )
      .subscribe(isDoctor => (this.isDoctor = isDoctor));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
