import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogPatientNotificationComponent } from './dialog-patient-notification.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VisitStatus } from '../../../visits/models/visit';
import { NotificationTypePipe } from '../../pipes/notification-type.pipe';

describe('DialogPatientNotificationComponent', () => {
  let component: DialogPatientNotificationComponent;
  let fixture: ComponentFixture<DialogPatientNotificationComponent>;
  let dialogRef: MatDialogRef<DialogPatientNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPatientNotificationComponent, NotificationTypePipe],
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
              status: VisitStatus.CANCELED,
              visitDate: '2019-08-13T08:30:00.000Z',
              doctor: {
                name: 'John',
                surname: 'Doe',
              },
              rejectReason: 'Rejected',
              notification: { id: 111, status: 'read', type: 'danger' }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPatientNotificationComponent);
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
    component.onOkClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should show dialog title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('Informacja o wizycie');
  });
  
  it('should show a dialog\'s paragraph with a specific text', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toEqual('Wizyta w dniu 13/08/2019 o godzinie 10:30 została odrzucona przez lek. John Doe.');
  });

  it('should show a dialog\'s description with a specific text', () => {
    const dd = fixture.nativeElement.querySelector('.dialog__desc > dd');
    expect(dd.textContent.trim()).toEqual('Rejected');
  });

  it('should show two buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.dialog__footer > button');
    expect(buttons.length).toEqual(2);
  });
});
