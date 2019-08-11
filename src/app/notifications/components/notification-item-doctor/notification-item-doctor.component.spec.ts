import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationItemDoctorComponent } from './notification-item-doctor.component';

describe('NotificationItemDoctorComponent', () => {
  let component: NotificationItemDoctorComponent;
  let fixture: ComponentFixture<NotificationItemDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationItemDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
