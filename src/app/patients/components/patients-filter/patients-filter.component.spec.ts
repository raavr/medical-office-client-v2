import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsFilterComponent } from './patients-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PatientsFilterComponent', () => {
  let component: PatientsFilterComponent;
  let fixture: ComponentFixture<PatientsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsFilterComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
