import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordFormComponent } from './reset-password-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ResetPasswordFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
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
    const values = {
      email: 'test@example.com',
    };
    component.form.setValue(values);

    spyOn(component.submitForm, 'emit');
    component.submit();

    expect(component.form.valid).toEqual(true);
    expect(component.submitForm.emit).toHaveBeenCalledWith(values);
  });

  it('shouldn\'t emit an event if the form is invalid', () => {
    const values = {
      email: 'test@',
    };
    component.form.setValue(values);

    spyOn(component.submitForm, 'emit');
    component.submit();

    expect(component.form.valid).toEqual(false);
    expect(component.submitForm.emit).not.toHaveBeenCalledWith(values);
  });
});
