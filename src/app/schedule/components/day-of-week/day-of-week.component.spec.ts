import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekComponent } from './day-of-week.component';

describe('DayOfWeekComponent', () => {
  let component: DayOfWeekComponent;
  let fixture: ComponentFixture<DayOfWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
