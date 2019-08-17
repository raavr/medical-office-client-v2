import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordFormComponent } from './new-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewPasswordFormComponent', () => {
  let component: NewPasswordFormComponent;
  let fixture: ComponentFixture<NewPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ NewPasswordFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should disable the form if pending', () => {
    component.pending = true;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(component.form.disabled).toBe(true);
    expect(compiled.querySelector('input').getAttribute('disabled')).not.toBeNull();
  });

  it('should display a mat-spinner component if pending', () => {
    component.pending = true;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(compiled.querySelector('mat-spinner')).not.toBeNull();
  });

  it('should emit an event if the form is valid when submitted', () => {
    const passwords = {
      password: 'password123',
      confirmPassword: 'password123',
    };
    component.form.setValue(passwords);

    spyOn(component.submitForm, 'emit');
    component.submit();

    expect(component.form.valid).toEqual(true);
    expect(component.submitForm.emit).toHaveBeenCalledWith(passwords.password);
  });

  it('shouldn\'t emit an event if the form is invalid', () => {
    const passwords = {
      password: 'password',
      confirmPassword: 'password',
    };
    component.form.setValue(passwords);

    spyOn(component.submitForm, 'emit');
    component.submit();

    expect(component.form.valid).toEqual(false);
    expect(component.submitForm.emit).not.toHaveBeenCalledWith(passwords.password);
  });
});
