import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { AlertComponent } from './alert.component';

export enum ALERT_TYPE {
  WARN,
  SUCCESS
}

@Injectable()
export class AlertFactoryService {
  constructor(private snackBar: MatSnackBar) {}

  create(
    error: string,
    options: { type: ALERT_TYPE; duration?: number }
  ): MatSnackBarRef<any> {
    return this.snackBar.openFromComponent(AlertComponent, {
      data: error,
      duration: options.duration || 150000,
      panelClass:
        options.type === ALERT_TYPE.WARN
          ? 'alert--warn'
          : 'alert--success',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
