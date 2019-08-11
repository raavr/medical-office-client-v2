import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPatientNotificationComponent } from './dialog-patient-notification.component';

describe('DialogPatientNotificationComponent', () => {
  let component: DialogPatientNotificationComponent;
  let fixture: ComponentFixture<DialogPatientNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPatientNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPatientNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
