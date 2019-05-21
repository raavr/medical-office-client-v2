import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as fromNavbar from './navbar/reducers';
import { Observable } from 'rxjs';
import { NavbarActions } from './navbar/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromNavbar.getShowSidenav));
  }

  closeSidenav() {
    this.store.dispatch(new NavbarActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new NavbarActions.OpenSidenav());
  }
}
