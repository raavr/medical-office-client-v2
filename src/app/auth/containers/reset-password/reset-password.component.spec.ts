import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { ResetPasswordComponent } from './reset-password.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResetPasswordRequest } from '../../actions/reset-password.actions';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let store: Store<fromAuth.State>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [ ResetPasswordComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
 
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a resetPasswordRequest action on submit', () => {
    const email = 'test@example.com';
    const action = new ResetPasswordRequest(email);

    component.onSubmit(email);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
