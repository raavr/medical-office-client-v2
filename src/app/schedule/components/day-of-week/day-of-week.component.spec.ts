import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekComponent } from './day-of-week.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateAdapter } from '@angular/material';

describe('DayOfWeekComponent', () => {
  let component: DayOfWeekComponent;
  let fixture: ComponentFixture<DayOfWeekComponent>;
  let visitTime = { dayOfWeek: 0, visitTime: [
    {time: '10:00', selected: false},
    {time: '11:00', selected: false},
  ]}
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
    
    component.visitTime = visitTime;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set every element of visitTime to the object with property selected equals true', () => {
    component.allSelected = false;
    fixture.detectChanges();
    expect(component.visitTime.visitTime.every(el => !el.selected)).toBe(true);
    component.selectAll();
    expect(component.visitTime.visitTime.every(el => el.selected)).toBe(true);
  });

  it('should set every element of visitTime to the object with property selected equals false', () => {
    component.allSelected = true;
    component.visitTime = { dayOfWeek: 0, visitTime: [
      {time: '10:00', selected: false},
      {time: '11:00', selected: false},
    ]};
    fixture.detectChanges();
    expect(component.visitTime.visitTime.every(el => !el.selected)).toBe(true);
    component.selectAll();
    expect(component.visitTime.visitTime.every(el => !el.selected)).toBe(true);
  });

  it('should call onWeeklyTimesChanged.emit method when selectAll method is called', () => {
    spyOn(component.onWeeklyTimesChanged, 'emit');
    expect(component.onWeeklyTimesChanged.emit).not.toHaveBeenCalled();
    component.selectAll();
    expect(component.onWeeklyTimesChanged.emit).toHaveBeenCalled();
  });

  it('should call onWeeklyTimesChanged.emit method when changeSelected method is called', () => {
    spyOn(component.onWeeklyTimesChanged, 'emit');
    expect(component.onWeeklyTimesChanged.emit).not.toHaveBeenCalled();
    component.changeSelected({source: null, checked: true}, component.visitTime.visitTime[0]);
    expect(component.onWeeklyTimesChanged.emit).toHaveBeenCalled();
  });

  it('should set time.selected to specific value when changeSelected method is called', () => {
    component.visitTime = { dayOfWeek: 0, visitTime: [
      {time: '10:00', selected: false},
      {time: '11:00', selected: false},
    ]};
    fixture.detectChanges();
    expect(component.visitTime.visitTime[0].selected).toBe(false);
    component.changeSelected({source: null, checked: true}, component.visitTime.visitTime[0]);
    expect(component.visitTime.visitTime[0].selected).toBe(true);
  });

  it('should return "select all"', () => {
    component.allSelected = true;
    fixture.detectChanges();
    expect(component.checkboxLabel()).toEqual('select all');
  });

  it('should return "deselect all"', () => {
    component.allSelected = false;
    fixture.detectChanges();
    expect(component.checkboxLabel()).toEqual('deselect all');
  });

  it('should render two mat-slide-toggle', () => {
    const matSlideToggles = fixture.nativeElement.querySelectorAll('mat-slide-toggle');
    expect(matSlideToggles.length).toBe(2);
  });

  it('should render <legend> element containing text "Poniedzialek"', () => {
    const legend = fixture.nativeElement.querySelector('legend');
    expect(legend.textContent.trim()).toEqual('Poniedzialek');
  });
});
