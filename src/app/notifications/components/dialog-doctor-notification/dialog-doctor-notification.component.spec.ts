import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDoctorNotificationComponent } from './dialog-doctor-notification.component';

describe('DialogDoctorNotificationComponent', () => {
  let component: DialogDoctorNotificationComponent;
  let fixture: ComponentFixture<DialogDoctorNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDoctorNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDoctorNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
