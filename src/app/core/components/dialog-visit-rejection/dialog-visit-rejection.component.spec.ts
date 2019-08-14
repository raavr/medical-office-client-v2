import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogVisitRejectionComponent } from './dialog-visit-rejection.component';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DialogVisitRejectionComponent', () => {
  let component: DialogVisitRejectionComponent;
  let fixture: ComponentFixture<DialogVisitRejectionComponent>;
  let dialogRef: MatDialogRef<DialogVisitRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVisitRejectionComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVisitRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = TestBed.get(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when onCancelClick method is called', () => {
    spyOn(dialogRef, 'close');
    expect(component.dialogRef.close).not.toHaveBeenCalled();
    component.onCancelClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should show dialog title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('Podaj powód odwołania wizyty');
  });

  it('should show three buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.dialog__footer > button'
    );
    expect(buttons.length).toEqual(2);
  });
});
