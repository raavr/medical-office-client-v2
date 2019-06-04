import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { AlertComponent } from './alert.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { AlertReset } from '../../actions/alert.actions';

export enum ALERT_TYPE {
  WARN,
  SUCCESS
}

@Injectable()
export class AlertFactoryService {
  constructor(
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.State>
  ) {}

  create(
    error: string,
    options: { type: ALERT_TYPE; duration?: number }
  ): MatSnackBarRef<any> {
    const snackBar = this.snackBar.openFromComponent(AlertComponent, {
      data: error,
      duration: options.duration || 3000,
      panelClass:
        options.type === ALERT_TYPE.WARN ? 'alert--warn' : 'alert--success',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    snackBar.afterDismissed().subscribe(() => {
      this.store.dispatch(new AlertReset());
    });

    return snackBar;
  }
}
