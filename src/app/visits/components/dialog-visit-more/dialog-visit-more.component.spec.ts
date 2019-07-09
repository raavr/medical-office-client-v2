import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisitMoreComponent } from './dialog-visit-more.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitStatusPipe } from '../../pipes/visit-status.pipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VisitStatus } from '../../models/visit';

describe('DialogVisitMoreComponent', () => {
  let component: DialogVisitMoreComponent;
  let fixture: ComponentFixture<DialogVisitMoreComponent>;
  let host: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVisitMoreComponent, VisitStatusPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            isDoctor: false,
            visit: {
              createDate: '2019-08-13T07:30:00.000Z',
              description: 'Zapis',
              id: 124,
              status: VisitStatus.ACCEPTED,
              doctor: { sub: '1', name: 'Test', surname: 'Test' },
              visitDate: '2019-08-13T08:30:00.000Z'
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVisitMoreComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close when onOkClick method is called', () => {
    spyOn(component.dialogRef, 'close');
    expect(component.dialogRef.close).not.toHaveBeenCalled();
    component.onOkClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call onOkClick method when the button is clicked', () => {
    const button = host.querySelector('button');
    spyOn(component.dialogRef, 'close');
    spyOn(component, 'onOkClick').and.callThrough();
    expect(component.onOkClick).not.toHaveBeenCalled();
    button.click();
    expect(component.onOkClick).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should render h2 element containing text "Szczegóły wizyty"', () => {
    const h2 = host.querySelector('h2');
    expect(h2.textContent).toEqual('Szczegóły wizyty');
  });

  it('should render dt element containing "Pacjent:" text when data.isDoctor equals true', () => {
    component.data.isDoctor = true;
    const { doctor, ...visit } = component.data.visit;
    component.data.visit = {
      ...visit,
      patient: { sub: '1', name: 'Test', surname: 'Test' }
    };
    fixture.detectChanges();
    const dt = host.querySelectorAll('dt')[2];
    expect(dt.textContent).toEqual('Pacjent:');
  });

  it('should render dt element containing "Lekarz:" text when data.isDoctor equals false', () => {
    component.data.isDoctor = false;
    fixture.detectChanges();
    const dt = host.querySelectorAll('dt')[2];
    expect(dt.textContent).toEqual('Lekarz:');
  });
});
