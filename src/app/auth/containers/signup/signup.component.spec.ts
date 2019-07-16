import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { SignupComponent } from './signup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertFactoryService, ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { Signup } from '../../actions/signup.actions';
import { AlertShow } from 'src/app/core/actions/alert.actions';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: Store<fromAuth.State>;
  let alertFactory: AlertFactoryService;
  const signupData = {
    name: 'John',
    surname: 'Doe',
    email: 'john@example.com',
    password: 'test123',
    confirmPassword: 'test123'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [
        SignupComponent,
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
    fixture = TestBed.createComponent(SignupComponent);
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

  it('should dispatch a signup action on submit', () => {
    const action = new Signup(signupData);

    component.onSubmit(signupData);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an alertShow action and call alertFactoryService', () => {
    const message = 'Something went wrong';
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
