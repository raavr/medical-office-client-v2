import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledDatesComponent } from './disabled-dates.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormatDateService } from 'src/app/visits/services/format-date.service';

describe('DisabledDatesComponent', () => {
  let component: DisabledDatesComponent;
  let fixture: ComponentFixture<DisabledDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisabledDatesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FormatDateService,
          useValue: {
            formatDate: () => {}
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
