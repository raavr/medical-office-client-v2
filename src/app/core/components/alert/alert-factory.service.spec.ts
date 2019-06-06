import { TestBed } from '@angular/core/testing';

import { AlertFactoryService, ALERT_TYPE } from './alert-factory.service';
import { MatSnackBar } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { AlertComponent } from './alert.component';
import { of } from 'rxjs';

describe('AlertFactoryService', () => {
  let service: AlertFactoryService;
  let store: Store<fromRoot.State>;
  let snackBarService: MatSnackBar;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {},
            afterDismissed: () => {}
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(AlertFactoryService);
    store = TestBed.get(Store);
    snackBarService = TestBed.get(MatSnackBar);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the snackBar.openFromComponent with specific args', () => {
    const error = 'Message';
    const snackBar = { afterDismissed: () => of(null) };
    spyOn(snackBarService, 'openFromComponent').and.returnValue(snackBar);

    service.create(error, { type: ALERT_TYPE.SUCCESS });
    const options = {
      data: error,
      duration: 3000,
      panelClass: 'alert--success',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };

    expect(snackBarService.openFromComponent).toHaveBeenCalledWith(
      AlertComponent,
      options
    );
  });
});
