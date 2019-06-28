import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorActionComponent } from './doctor-action.component';

describe('DoctorActionComponent', () => {
  let component: DoctorActionComponent;
  let fixture: ComponentFixture<DoctorActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
