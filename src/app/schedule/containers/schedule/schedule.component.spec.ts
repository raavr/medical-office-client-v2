import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../core/reducers';
import * as fromSchedule from '../../reducers';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          schedule: combineReducers(fromSchedule.reducers),
        })
      ],
      declarations: [ ScheduleComponent ],
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
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
