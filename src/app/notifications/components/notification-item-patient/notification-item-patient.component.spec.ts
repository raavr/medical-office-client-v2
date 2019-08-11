import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationItemPatientComponent } from './notification-item-patient.component';

describe('NotificationItemPatientComponent', () => {
  let component: NotificationItemPatientComponent;
  let fixture: ComponentFixture<NotificationItemPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationItemPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
