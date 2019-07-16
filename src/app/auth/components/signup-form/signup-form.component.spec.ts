import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the form if pending', () => {
    component.pending = true;
    const compiled = fixture.debugElement.nativeElement;
    const inputs = compiled.querySelectorAll('input');

    fixture.detectChanges();

    expect(component.form.disabled).toBe(true);
    Array.from(inputs).forEach((input: HTMLElement) => {
      expect(input.getAttribute('disabled')).not.toBeNull();
    });
  });

  it('should display a mat-spinner component if pending', () => {
    component.pending = true;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(compiled.querySelector('mat-spinner')).not.toBeNull();
  });

  it('should emit an event if the form is valid when submitted', () => {
    const signupData = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'test1234',
      confirmPassword: 'test1234'
    };
    component.form.setValue(signupData);
    fixture.detectChanges();
    spyOn(component.submitForm, 'emit');
    component.submit();

    expect(component.submitForm.emit).toHaveBeenCalledWith(signupData);
  });
});
