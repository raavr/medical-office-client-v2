import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDoctorNotificationComponent } from './dialog-doctor-notification.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VisitStatus } from 'src/app/visits/models/visit';

describe('DialogDoctorNotificationComponent', () => {
  let component: DialogDoctorNotificationComponent;
  let fixture: ComponentFixture<DialogDoctorNotificationComponent>;
  let dialogRef: MatDialogRef<DialogDoctorNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDoctorNotificationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            notification: {
              createDate: '2019-08-13T07:30:00.000Z',
              description: 'Zapis',
              id: 124,
              status: VisitStatus.ACCEPTED,
              visitDate: '2019-08-13T08:30:00.000Z',
              patient: {
                name: 'John',
                surname: 'Doe',
              },
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDoctorNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = TestBed.get(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when onCancelClick method is called', () => {
    spyOn(dialogRef, 'close');
    expect(component.dialogRef.close).not.toHaveBeenCalled();
    component.onCancelClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should show dialog title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('Informacja o wizycie');
  });
  
  it('should show a dialog\'s paragraph with a specific text', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toEqual('Pacjent John Doe zapisał się na wizytę 13/08/2019 o godzinie 10:30.');
  });

  it('should show a dialog\'s description with a specific text', () => {
    const dd = fixture.nativeElement.querySelector('.dialog__desc > dd');
    expect(dd.textContent.trim()).toEqual('Zapis');
  });

  it('should show three buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.dialog__footer > button');
    expect(buttons.length).toEqual(3);
  });
});
