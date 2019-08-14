import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationItemPatientComponent } from './notification-item-patient.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationTypePipe } from '../../pipes/notification-type.pipe';
import { VisitStatus } from 'src/app/visits/models/visit';

describe('NotificationItemPatientComponent', () => {
  let component: NotificationItemPatientComponent;
  let fixture: ComponentFixture<NotificationItemPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationItemPatientComponent, NotificationTypePipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display text', () => {
    component.notification = {
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
      notification: { id: 111, status: 'read', type: 'danger' }
    };

    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('span');
    expect(text.textContent.trim()).toEqual(
      'Wizyta w dniu 13/08/2019 o godzinie 10:30 została odrzucona'
    );
  });
});
