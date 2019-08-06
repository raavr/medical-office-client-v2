import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CreatePatientComponent } from './create-patient.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import { of } from 'rxjs';
import { DialogCreatePatientComponent } from '../dialog-create-patient/dialog-create-patient.component';

describe('CreatePatientComponent', () => {
  let component: CreatePatientComponent;
  let fixture: ComponentFixture<CreatePatientComponent>;
  let hostElement: HTMLElement;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [CreatePatientComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(null)
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.nativeElement;
    dialog = TestBed.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialog.open when openDialog method is called', () => {
    spyOn(dialog, 'open').and.callThrough();
    
    expect(dialog.open).not.toHaveBeenCalled();
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(DialogCreatePatientComponent, {
      width: '450px'
    });
  });

  it('should display mat-spinner when pending equals true', () => {
    component.pending = true;
    fixture.detectChanges();
    const spinner = hostElement.querySelector('mat-spinner');
    
    expect(spinner).not.toBeNull();
  });

  it('should display mat-spinner when pending equals false', () => {
    component.pending = false;
    fixture.detectChanges();
    const spinner = hostElement.querySelector('mat-spinner');

    expect(spinner).toBeNull();
  });
});
