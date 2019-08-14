import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationMenuComponent } from './notification-menu.component';
import { MatDialogModule, MatDialog, MatMenuModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Visit, VisitStatus } from 'src/app/visits/models/visit';
import { PatientNotification } from '../../models/patient-notification.interface';

describe('NotificationMenuComponent', () => {
  let component: NotificationMenuComponent;
  let fixture: ComponentFixture<NotificationMenuComponent>;
  let dialog: MatDialog;
  let router: Router;
  let patientNotification: PatientNotification;
  let doctorNotification: Visit;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatMenuModule],
      declarations: [NotificationMenuComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(null)
            })
          }
        },
        {
          provide: Router,
          useValue: { navigate: () => {} }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.get(MatDialog);
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    patientNotification = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.CANCELED,
      visitDate: '2019-08-13T08:30:00.000Z',
      doctor: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      },
      rejectReason: 'Rejected',
      notification: { id: 111, status: 'read', type: 'danger' }
    };

    doctorNotification = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z',
      patient: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call markAsRead.emit when the DialogPatientNotificationComponent is closed', () => {
    spyOn(component.markAsRead, 'emit');
    component.onPatientNotificationClicked(patientNotification);
    expect(component.markAsRead.emit).not.toHaveBeenCalled();
  });

  it('should call markAsRead.emit when the DialogPatientNotificationComponent is closed', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of('ok')
    });
    spyOn(component.markAsRead, 'emit');
    component.onPatientNotificationClicked(patientNotification);
    expect(component.markAsRead.emit).toHaveBeenCalledWith(patientNotification);
  });

  it('should call modifyVisitStatus.emit when the DialogDoctorNotificationComponent is closed', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(VisitStatus.ACCEPTED)
    });
    spyOn(component.modifyVisitStatus, 'emit');
    component.onDoctorNotificationClicked(doctorNotification);
    expect(component.modifyVisitStatus.emit).toHaveBeenCalledWith({
      status: VisitStatus.ACCEPTED,
      visitsIds: [doctorNotification.id]
    });
  });

  it('should call router.navigate when onFooterBtnClicked is called', () => {
    spyOn(router, 'navigate');
    component.isDoctor = true;
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
    component.onFooterBtnClicked();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/dashboard/visits/current'],
      { queryParams: { status: VisitStatus.RESERVED } }
    );
  });

  it('should call markAllAsRead.emit when onFooterBtnClicked is called', () => {
    spyOn(component.markAllAsRead, 'emit');
    component.isDoctor = false;
    fixture.detectChanges();
    expect(component.markAllAsRead.emit).not.toHaveBeenCalled();
    component.onFooterBtnClicked();
    expect(component.markAllAsRead.emit).toHaveBeenCalled();
  });

  it('should mat-icon have "ring" class', () => {
    component.isAnimationRunning = true;
    fixture.detectChanges();
    const matIcon = fixture.nativeElement.querySelector('.ring');
    expect(matIcon).not.toBeNull();
  });

  it('shouldn\'t mat-icon have "ring" class', () => {
    component.isAnimationRunning = false;
    fixture.detectChanges();
    const matIcon = fixture.nativeElement.querySelector('.ring');
    expect(matIcon).toBeNull();
  });
});
