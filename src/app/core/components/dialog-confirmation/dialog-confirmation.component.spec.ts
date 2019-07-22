import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let fixture: ComponentFixture<DialogConfirmationComponent>;
  let host: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Czy na pewno chcesz usunąć rezerwację wizyty?'
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close when onCancelClick method is called', () => {
    spyOn(component.dialogRef, 'close');
    expect(component.dialogRef.close).not.toHaveBeenCalled();
    component.onCancelClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call onCancelClick method when button is clicked', () => {
    const button = host.querySelector('button');
    spyOn(component.dialogRef, 'close');
    spyOn(component, 'onCancelClick').and.callThrough();
    expect(component.onCancelClick).not.toHaveBeenCalled();
    button.click();
    expect(component.onCancelClick).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should render div element containing text "Czy na pewno chcesz usunąć rezerwację wizyty"', () => {
    const div = host.querySelector('div');
    expect(div.textContent.trim()).toEqual('Czy na pewno chcesz usunąć rezerwację wizyty?');
  });
});
