import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTableComponent } from './patients-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material';

describe('PatientsTableComponent', () => {
  let component: PatientsTableComponent;
  let fixture: ComponentFixture<PatientsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CdkTableModule, MatDialogModule],
      declarations: [ PatientsTableComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
