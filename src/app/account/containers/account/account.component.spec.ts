import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromProfile from '../../reducers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          profile: combineReducers(fromProfile.reducers)
        })
      ],
      declarations: [AccountComponent],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
