import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './core/reducers';
import * as fromNavbar from './navbar/reducers';
import * as fromProfile from './account/reducers';
import { Observable, Subject } from 'rxjs';
import { NavbarActions } from './navbar/actions';
import * as fromAuth from './auth/reducers';
import { User } from './auth/models/user';
import * as AuthAction from './auth/actions/auth.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil, filter } from 'rxjs/operators';
import { MediaActions } from './core/actions/';
import { AlertFactoryService } from './core/components/alert/alert-factory.service';
import { Alert } from './core/model/alert.interface';
import { APP_BREAKPOINTS } from './core/constants/breakpoints.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  profile: User;
  media$: Observable<any>;
  loggedIn$: Observable<boolean>;
  isDoctor$: Observable<boolean>;
  alert$: Observable<Alert>;

  XSmall = Breakpoints.XSmall;
  private unsub$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private breakpointObserver: BreakpointObserver,
    private alert: AlertFactoryService,
  ) {
    this.showSidenav$ = this.store.pipe(select(fromNavbar.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.isDoctor$ = this.store.pipe(select(fromAuth.isDoctor));
    this.media$ = this.store.pipe(select(fromRoot.getMediaQuery));
    this.store
      .pipe(select(fromProfile.getProfile))
      .subscribe(profile => (this.profile = profile));
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
  }

  closeSidenav() {
    this.store.dispatch(new NavbarActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new NavbarActions.OpenSidenav());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new AuthAction.Logout());
  }

  private _observeMedia() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        APP_BREAKPOINTS.Mobile
      ])
      .pipe(takeUntil(this.unsub$))
      .subscribe(result => {
        if (result.matches) {
          this.store.dispatch(
            new MediaActions.MediaChanged(result.breakpoints)
          );
        }
      });
  }

  private initAlert() {
    this.alert$
      .pipe(
        takeUntil(this.unsub$),
        filter(payload => !!payload && !!payload.message)
      )
      .subscribe(payload =>
        this.alert.create(payload.message, { type: payload.alertType })
      );
  }

  ngOnInit() {
    this._observeMedia();
    this.initAlert();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
