import { Component } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, map, startWith } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { APP_BREAKPOINTS } from 'src/app/core/constants/breakpoints.constant';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-dashboard-menu
      *ngIf="isDoctor && !isDashboardRoot"
      [isMobile]="(media$ | async)[MobileBreakpoint]"
    ></app-dashboard-menu>
    <div [class.dashboard__router]="isDoctor && !isDashboardRoot">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isDoctor: boolean;
  isDashboardRoot: boolean;
  media$: Observable<any>;

  MobileBreakpoint = APP_BREAKPOINTS.Mobile;
  private unsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
  ) {
    store
      .pipe(
        select(fromAuth.isDoctor),
        takeUntil(this.unsub$)
      )
      .subscribe(isDoctor => (this.isDoctor = isDoctor));
    this.media$ = this.store.pipe(select(fromRoot.getMediaQuery));
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.unsub$),
        filter(ev => ev instanceof NavigationEnd),
        map((ev: NavigationEnd) => ev.urlAfterRedirects),
        startWith(this.router.url),
        map(url => url.split('/').length)
      )
      //if the length is lower than 2 it means the url ends on /dashboard
      .subscribe(len => (this.isDashboardRoot = len <= 2));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
