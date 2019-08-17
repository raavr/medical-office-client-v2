import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { NewPasswordComponent } from './new-password.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResetPassword } from '../../actions/reset-password.actions';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [ NewPasswordComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'some token' }),
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a resetPassword action on submit', () => {
    const password = 'password';
    const passwordToken = 'some token';
    const action = new ResetPassword({ password, passwordToken });

    component.onSubmit(password);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
