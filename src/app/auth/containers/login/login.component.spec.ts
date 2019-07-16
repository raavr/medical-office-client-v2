import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { LoginComponent } from './login.component';
import { Login } from '../../actions/auth.actions';
import { AlertFactoryService, ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { AlertShow } from 'src/app/core/actions/alert.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromAuth.State>;
  let alertFactory: AlertFactoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [
        LoginComponent,
      ],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    alertFactory = TestBed.get(AlertFactoryService);
    
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(alertFactory, 'create');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a login action on submit', () => {
    const credentials: any = {};
    const action = new Login(credentials);

    component.onSubmit(credentials);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an alertShow action and call alertFactoryService', () => {
    const message = 'Wrong email or password';
    const action = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });

    store.dispatch(action);

    component.alert$.subscribe(error => {
      expect(error.message).toEqual(message);
      expect(alertFactory.create).toHaveBeenCalledWith(message, { type: ALERT_TYPE.WARN });
    });
  });

  it('should dispatch an alertShow action and not call alertFactoryService', () => {
    const message = '';
    const action = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });

    store.dispatch(action);

    component.alert$.subscribe(_ => {
      expect(alertFactory.create).not.toHaveBeenCalled();
    });
  });
});
