import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationItemDoctorComponent } from './notification-item-doctor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitStatus } from 'src/app/visits/models/visit';

describe('NotificationItemDoctorComponent', () => {
  let component: NotificationItemDoctorComponent;
  let fixture: ComponentFixture<NotificationItemDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationItemDoctorComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemDoctorComponent);
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
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z',
      patient: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      }
    };
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('span');
    expect(text.textContent.trim()).toEqual(
      'John Doe zapisał się na wizytę 13/08/2019 o godzinie 10:30'
    );
  });
});
