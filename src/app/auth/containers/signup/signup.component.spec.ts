import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { SignupComponent } from './signup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { Signup } from '../../actions/signup.actions';

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
});
