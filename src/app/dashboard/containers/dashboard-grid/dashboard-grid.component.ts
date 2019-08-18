import { Component } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.scss']
})
export class DashboardGridComponent {
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
