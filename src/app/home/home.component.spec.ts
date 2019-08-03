import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromAuth from '../auth/reducers';
import { DecodeTokenSuccess } from '../auth/actions/auth.actions';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        }),
       ],
      declarations: [ HomeComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    store.dispatch(new DecodeTokenSuccess({ name: 'Test', id: '1'}));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
