import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './core/reducers';
import * as fromNavbar from './navbar/reducers';
import { Observable, Subject } from 'rxjs';
import { NavbarActions } from './navbar/actions';
import * as fromAuth from './auth/reducers';
import { User } from './auth/models/user';
import * as AuthAction from './auth/actions/auth.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { MediaActions } from './core/actions/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  user$: Observable<User>;
  media$: Observable<any>;
  loggedIn$: Observable<boolean>;
  
  XSmall = Breakpoints.XSmall;
  private mediaUnsub$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.showSidenav$ = this.store.pipe(select(fromNavbar.getShowSidenav));
    this.user$ = this.store.pipe(select(fromAuth.getUser));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.media$ = this.store.pipe(select(fromRoot.getMediaQuery));
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
        Breakpoints.Large
      ])
      .pipe(takeUntil(this.mediaUnsub$))
      .subscribe(result => {
        if (result.matches) {
          this.store.dispatch(
            new MediaActions.MediaChanged(result.breakpoints)
          );
        }
      });
  }

  ngOnInit() {
    this.store.dispatch(new AuthAction.AutoLogin());
    this._observeMedia();
  }

  ngOnDestroy(): void {
    this.mediaUnsub$.next();
    this.mediaUnsub$.complete();
  }
}
