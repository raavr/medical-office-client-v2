import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Passwords } from '../../model/passwords';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let passwords: Passwords;
  let initialPasswords: Passwords;

  beforeEach(() => {
    passwords = {
      oldPassword: 'test1234',
      password: 'pass1234',
      confirmPassword: 'pass1234'
    };

    initialPasswords = {
      oldPassword: null,
      password: null,
      confirmPassword: null
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ChangePasswordComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(component.onPasswordChanged, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form values and reset the form when the form is valid', () => {
    spyOn(component.form, 'resetForm').and.callThrough();
    component.passwords.setValue(passwords);

    expect(component.onPasswordChanged.emit).not.toHaveBeenCalled();
    expect(component.form.resetForm).not.toHaveBeenCalled();
    component.changePassword();

    expect(component.onPasswordChanged.emit).toHaveBeenCalledWith(passwords);
    expect(component.form.resetForm).toHaveBeenCalled();
    expect(component.passwords.value).toEqual(initialPasswords);
  });

  it('should not emit form values when the form is invalid', () => {
    component.passwords.setValue({
      oldPassword: '',
      password: 'test1234',
      confirmPassword: 'test1234'
    });
    expect(component.onPasswordChanged.emit).not.toHaveBeenCalled();
    component.changePassword();
    expect(component.onPasswordChanged.emit).not.toHaveBeenCalled();
  });

  it('should disable the sumbit button when the form is invalid', () => {
    component.passwords.setValue({
      oldPassword: '',
      password: 'test1234',
      confirmPassword: 'test1234'
    });
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(component.passwords.invalid).toBe(true);
    expect(
      compiled.querySelector('button[type="submit"]').getAttribute('disabled')
    ).not.toBeNull();
  });
});
