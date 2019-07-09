import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVisitComponent } from './book-visit.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material';
import { DialogBookVisitComponent } from '../dialog-book-visit/dialog-book-visit.component';
import { of } from 'rxjs';

describe('BookVisitComponent', () => {
  let component: BookVisitComponent;
  let fixture: ComponentFixture<BookVisitComponent>;
  let host: HTMLElement;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [BookVisitComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(null),
              componentInstance: {
                onDateChanged: of({}),
                onPatientNameTyped: of({}),
                onDoctorSelected: of({})
              }
            })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    host = fixture.nativeElement;
    dialog = TestBed.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-book-visit-btn component', () => {
    const bookBtn = host.querySelector('app-book-visit-btn');
    expect(bookBtn).not.toBeNull();
  });

  it('should render mat-spinner if the bookVisitPending input equals true', () => {
    component.bookVisitPending = true;
    fixture.detectChanges();
    const spinner = host.querySelector('mat-spinner');
    expect(spinner).not.toBeNull();
  });

  it('should not render mat-spinner if the bookVisitPending input equals false', () => {
    component.bookVisitPending = false;
    fixture.detectChanges();
    const spinner = host.querySelector('mat-spinner');
    expect(spinner).toBeNull();
  });

  it('should call openDialog method and emit isDoctor value when onBookVisitBtnClicked is called', () => {
    spyOn(component, 'openDialog');
    spyOn(component.bookVisit, 'emit');
    component.isDoctor = true;
    fixture.detectChanges();

    expect(component.openDialog).not.toHaveBeenCalled();
    expect(component.bookVisit.emit).not.toHaveBeenCalled();
    component.onBookVisitBtnClicked();
    expect(component.openDialog).toHaveBeenCalled();
    expect(component.bookVisit.emit).toHaveBeenCalledWith(true);
  });

  it('should call dialog.open method when component.openDialog method is called', () => {
    spyOn(dialog, 'open').and.callThrough();
    component.isDoctor = true;
    fixture.detectChanges();

    expect(dialog.open).not.toHaveBeenCalled();
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(DialogBookVisitComponent, {
      width: '450px',
      data: { isDoctor: true }
    });
  });
});
