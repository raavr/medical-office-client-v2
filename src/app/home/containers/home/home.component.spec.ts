import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';

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
    expect(component).toBeTruthy();
  });

  it('should render <app-welcome>', () => {
    const appWelcome = fixture.nativeElement.querySelector(
      'app-welcome'
    );
    expect(appWelcome).not.toBeNull();
  });
});
