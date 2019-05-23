import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
      ],
      declarations: [ 
        LoginFormComponent,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
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

  it('should display an error message if provided', () => {
    component.errorMessage = 'Invalid credentials';
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(compiled.querySelector('.form__error').textContent.trim()).toBe('Invalid credentials');
  });

  it('should emit an event if the form is valid when submitted', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password',
    };
    component.form.setValue(credentials);

    spyOn(component.submitForm, 'emit');
    component.submit();

    expect(component.submitForm.emit).toHaveBeenCalledWith(credentials);
  });
});
