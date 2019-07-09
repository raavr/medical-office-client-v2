import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { DialogBookVisitComponent } from './dialog-book-visit.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatDialogRef,
  MatAutocompleteModule,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { fn } from 'moment';
import * as moment from 'moment';

describe('DialogBookVisitComponent', () => {
  let component: DialogBookVisitComponent;
  let fixture: ComponentFixture<DialogBookVisitComponent>;
  let host: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [DialogBookVisitComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} }  },
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {
          isDoctor: false,
          disabledDates: [],
          date: '',
          visitTimes: [],
          doctors: [],
        } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBookVisitComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close when onCancelClick method is called', () => {
    spyOn(component.dialogRef, 'close');
    expect(component.dialogRef.close).not.toHaveBeenCalled();
    component.onCancelClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call onCancelClick method when button is clicked', () => {
    const button = host.querySelector('button');
    spyOn(component.dialogRef, 'close');
    spyOn(component, 'onCancelClick').and.callThrough();
    expect(component.onCancelClick).not.toHaveBeenCalled();
    button.click();
    expect(component.onCancelClick).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should render <mat-spinner> when data.disabledDates is a falsy value and data.isDoctor equals true', () => {
    component.data.isDoctor = true;
    component.data.disabledDates = null;
    fixture.detectChanges();

    const spinner = host.querySelector('mat-spinner');
    const h2 = host.querySelector('h2');
    expect(h2).toBeNull();
    expect(spinner).not.toBeNull();
  });

  it('should render <mat-spinner> when data.doctors is a falsy value and data.isDoctor equals false', () => {
    component.data.isDoctor = false;
    component.data.doctors = null;
    fixture.detectChanges();

    const spinner = host.querySelector('mat-spinner');
    const h2 = host.querySelector('h2');
    expect(h2).toBeNull();
    expect(spinner).not.toBeNull();
  });

  it('should render h2 element containing "Zapisz się na wizytę" when data.doctors isn\'t null and data.isDoctor equals false', () => {
    component.data.isDoctor = false;
    component.data.doctors = [];
    fixture.detectChanges();

    const spinner = host.querySelector('mat-spinner');
    const h2 = host.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('Zapisz się na wizytę');
    expect(spinner).toBeNull();
  });

  it('should render h2 element containing "Zapisz pacjenta na wizytę" when data.disabledDates isn\'t null and data.isDoctor equals true', () => {
    component.data.isDoctor = true;
    component.data.disabledDates = [];
    fixture.detectChanges();

    const spinner = host.querySelector('mat-spinner');
    const h2 = host.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('Zapisz pacjenta na wizytę');
    expect(spinner).toBeNull();
  });

  it('should return string when displayFn is called with user object', () => {
    const user = { sub: '1', name: 'Test', surname: 'New' };
    expect(component.displayFn(user)).toEqual('Test New');
  });

  it('should return undefined when displayFn is called without an argument', () => {
    expect(component.displayFn()).toBeUndefined();
  });

  it('should return true if a moment date isn\'t included in disabledDates list', () => {
    component.data.disabledDates = [moment()];
    fixture.detectChanges();
    spyOn(fn, 'isSame').and.returnValue(false);
    expect(component.dateFilter(moment())).toEqual(true);
  });

  it('should return false if a moment date is included in disabledDates list', () => {
    component.data.disabledDates = [moment()];
    fixture.detectChanges();
    spyOn(fn, 'isSame').and.returnValue(true);
    expect(component.dateFilter(moment())).toEqual(false);
  });

  it('should return false if a moment date is included in disabledDates list', () => {
    component.data.disabledDates = null;
    fixture.detectChanges();
    expect(component.dateFilter(moment())).toEqual(false);
  });

  it('should reset the form and set data.visitTimes to empty list when resetTimeFormAndData method is called', () => {
    const visitTimes = [{ visitTime: '10:30' }];
    component.data.visitTimes = visitTimes;
    spyOn(component.form, 'get').and.callThrough();
    spyOn(component.form.get('time'), 'reset');

    expect(component.data.visitTimes).toEqual(visitTimes);
    component.resetTimeFormAndData();
    expect(component.form.get).toHaveBeenCalledWith('time');
    expect(component.form.get('time').reset).toHaveBeenCalled();
    expect(component.data.visitTimes).toEqual([]);
  });

  it('should set data.patients to empty list when resetPatientsData method is called', () => {
    const patients = [{ sub: '1', name: 'Test', surname: 'New' }];
    component.data.patients = patients;
    expect(component.data.patients).toEqual(patients);
    component.resetPatientsData();
    expect(component.data.patients).toEqual([]);
  });

  it('should enable button form if the form is valid', () => {
    component.form.setValue({
      date: moment(),
      time: '10:30',
      user: 'Ra',
      desc: ''
    });
    fixture.detectChanges();
    const button = host.querySelectorAll('button')[1];
    expect(button.getAttribute('disabled')).toBeNull();
  });
  
  it('should disabled button form if the form is invalid', () => {
    component.form.setValue({
      date: '',
      time: '',
      user: 'Ra',
      desc: ''
    });
    fixture.detectChanges();
    const button = host.querySelectorAll('button')[1];
    expect(button.getAttribute('disabled')).not.toBeNull();
  });
});
