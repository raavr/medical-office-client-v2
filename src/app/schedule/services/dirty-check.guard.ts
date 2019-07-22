import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { switchMap, take, map } from 'rxjs/operators';
import { DialogConfirmationComponent } from '../../core/components/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material';

export interface DirtyComponent {
  isDirty$: Array<Observable<boolean>>;
}

@Injectable({ providedIn: 'root' })
export class DirtyCheckGuard implements CanDeactivate<DirtyComponent> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(component: DirtyComponent) {
    return zip(...component.isDirty$).pipe(
      switchMap(dirties => {
        if (dirties.every(d => !d)) {
          return of(true);
        }

        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: {
            title:
              'Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?'
          }
        });

        return dialogRef.afterClosed().pipe(map(result => !!result));
      }),
      take(1)
    );
  }
}
