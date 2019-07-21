import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekListComponent } from './day-of-week-list.component';

describe('DayOfWeekListComponent', () => {
  let component: DayOfWeekListComponent;
  let fixture: ComponentFixture<DayOfWeekListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfWeekListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
