import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsComponent } from './patients.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromAccounts from '../../../account/reducers';
import * as fromPatients from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { AlertFactoryService } from '../../../core/components/alert/alert-factory.service';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          accounts: combineReducers(fromAccounts.reducers),
          patients: combineReducers(fromPatients.reducers),
        })
      ],
      declarations: [ PatientsComponent ],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
