import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AlertComponent } from './alert.component';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: 'Wrong email or password'
        },
        {
          provide: MatSnackBar,
          useClass: class {
            dismiss() {}
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the snackbar if the button was clicked', () => {
    spyOn(snackBar, 'dismiss');
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');

    button.click();
    fixture.detectChanges();

    expect(snackBar.dismiss).toHaveBeenCalled();
  });

  it('should render the span element', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('span').textContent).toBe('Wrong email or password');
  });
});
