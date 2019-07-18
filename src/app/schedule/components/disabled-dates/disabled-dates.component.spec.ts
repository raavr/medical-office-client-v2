import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledDatesComponent } from './disabled-dates.component';

describe('DisabledDatesComponent', () => {
  let component: DisabledDatesComponent;
  let fixture: ComponentFixture<DisabledDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledDatesComponent ]
    })
    .compileComponents();
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
