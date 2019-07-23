import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekComponent } from './day-of-week.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateAdapter } from '@angular/material';

describe('DayOfWeekComponent', () => {
  let component: DayOfWeekComponent;
  let fixture: ComponentFixture<DayOfWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfWeekComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DateAdapter, useValue: {
          format: () => "poniedzialek"
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekComponent);
    component = fixture.componentInstance;
    
    component.visitTime = {
      dayOfWeek: 0,
      visitTime: []
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
