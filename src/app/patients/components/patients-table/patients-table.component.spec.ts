import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTableComponent } from './patients-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { DialogConfirmationComponent } from 'src/app/core/components/dialog-confirmation/dialog-confirmation.component';

describe('PatientsTableComponent', () => {
  let component: PatientsTableComponent;
  let fixture: ComponentFixture<PatientsTableComponent>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CdkTableModule, MatDialogModule],
      declarations: [PatientsTableComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(null)
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should return column's names", () => {
    const defaultColumns = ['name', 'email', 'actions'];
    fixture.detectChanges();

    expect(component.displayedColumns).toEqual(defaultColumns);
  });

  it('should call onFilterChanged when filterChanged method is called', () => {
    const filter = {
      currentPage: 1,
      limit: 2
    };
    spyOn(component.onFilterChanged, 'emit');

    expect(component.onFilterChanged.emit).not.toHaveBeenCalled();
    component.filterChanged(filter);
    expect(component.onFilterChanged.emit).toHaveBeenCalledWith(filter);
  });

  it('should render div containing text "Brak pacjentów" if there is no patients', () => {
    component.patients = [];
    fixture.detectChanges();

    const noPatientsEl = fixture.nativeElement.querySelector('.table__row');
    expect(noPatientsEl.textContent.trim()).toEqual('Brak pacjentów');
  });

  it('should call dialog.open when removePatient method is called', () => {
    spyOn(dialog, 'open').and.callThrough();
    const user = {
      id: '1'
    };

    expect(dialog.open).not.toHaveBeenCalled();
    component.removePatient(user);
    expect(dialog.open).toHaveBeenCalledWith(DialogConfirmationComponent, {
      data: { title: 'Czy na pewno chcesz usunąć konto pacjenta?' }
    });
  });
});
