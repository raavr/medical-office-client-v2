import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTimeComponent } from './visit-time.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VisitTimeComponent', () => {
  let component: VisitTimeComponent;
  let fixture: ComponentFixture<VisitTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitTimeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
