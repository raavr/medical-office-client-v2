import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatePatientComponent } from './dialog-create-patient.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';

describe('DialogCreatePatientComponent', () => {
  let component: DialogCreatePatientComponent;
  let fixture: ComponentFixture<DialogCreatePatientComponent>;
  let host: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCreatePatientComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreatePatientComponent);
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

  it('should render h2 element containing "Utwórz konto pacjenta"', () => {
    const h2 = host.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('Utwórz konto pacjenta');
  });

  it('should enable button form if the form is valid', () => {
    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com'
    });
    fixture.detectChanges();
    const button = host.querySelectorAll('button')[1];
    expect(button.getAttribute('disabled')).toBeNull();
  });

  it('should disabled button form if the form is invalid', () => {
    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      email: 'john'
    });
    fixture.detectChanges();
    const button = host.querySelectorAll('button')[1];
    expect(button.getAttribute('disabled')).not.toBeNull();
  });
});
