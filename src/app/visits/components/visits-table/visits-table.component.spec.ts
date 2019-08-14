import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitsTableComponent } from './visits-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitStatusPipe } from '../../pipes/visit-status.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { VisitStatus, VisitType } from '../../models/visit';
import { PageEvent, MatDialog, MatDialogModule } from '@angular/material';
import { of } from 'rxjs';
import { DialogConfirmationComponent } from '../../../core/components/dialog-confirmation/dialog-confirmation.component';
import { DialogVisitMoreComponent } from '../dialog-visit-more/dialog-visit-more.component';

describe('VisitsTableComponent', () => {
  let component: VisitsTableComponent;
  let fixture: ComponentFixture<VisitsTableComponent>;
  let dialog: MatDialog;
  const visits = [
    {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z'
    },
    {
      createDate: '2019-08-15T07:30:00.000Z',
      description: 'None',
      id: 125,
      status: VisitStatus.CANCELED,
      visitDate: '2019-08-15T08:30:00.000Z'
    }
  ];
  const filter = {
    currentPage: 1,
    date: '',
    time: '',
    limit: 10,
    status: VisitStatus.ALL,
    type: VisitType.CURRENT,
    userName: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CdkTableModule, MatDialogModule],
      declarations: [VisitsTableComponent, VisitStatusPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of({ reason: 'Brak' })
            })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.get(MatDialog);
    component.visits = visits;
    component.filter = filter;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displayedColumns', () => {
    const defaultColumns = ['date', 'time', 'patient', 'status', 'actions'];

    it("should return default column's names including select column if isDotor flag is set and filter.type equals current", () => {
      component.isDoctor = true;

      fixture.detectChanges();

      expect(component.displayedColumns).toEqual(['select', ...defaultColumns]);
    });

    it("should return default column's names if isDoctor flag is not set", () => {
      component.isDoctor = false;

      fixture.detectChanges();

      expect(component.displayedColumns).toEqual(defaultColumns);
    });
  });

  it('should return true if filter.type is equal current', () => {
    expect(component.isCurrentTab).toEqual(true);
  });

  it('should return false if filter.type is equal past', () => {
    component.filter.type = VisitType.PAST;
    fixture.detectChanges();

    expect(component.isCurrentTab).toEqual(false);
  });

  it('should select all visit rows', () => {
    spyOn(component, 'isAllSelected').and.returnValue(false);
    component.masterToggle();
    expect(component.selection.selected.length).toEqual(
      component.visits.length
    );
  });

  it('should isAllSelected method return false', () => {
    expect(component.isAllSelected()).toEqual(false);
    component.selection.select(component.visits[0]);
    expect(component.isAllSelected()).toEqual(false);
  });

  it('should isAllSelected method return true', () => {
    expect(component.isAllSelected()).toEqual(false);
    component.selection.select(component.visits[0]);
    component.selection.select(component.visits[1]);
    expect(component.isAllSelected()).toEqual(true);
  });

  it('should call onFilterChanged when changePaginator method is called', () => {
    const pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 2,
      length: 2
    };
    const expected = {
      currentPage: 1,
      limit: 2
    };
    spyOn(component.onFilterChanged, 'emit');

    expect(component.onFilterChanged.emit).not.toHaveBeenCalled();
    component.changePaginator(pageEvent);
    expect(component.onFilterChanged.emit).toHaveBeenCalledWith(expected);
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

  it('should return specific aria label for a visit row', () => {
    expect(component.checkboxLabel(component.visits[0])).toEqual(
      'select row 125'
    );
    component.selection.select(component.visits[0]);
    expect(component.checkboxLabel(component.visits[0])).toEqual(
      'deselect row 125'
    );
  });

  it('should call onVisitsStatusModified when modifyVisitsStatus is called', () => {
    const status = VisitStatus.CANCELED;
    const expected = {
      status,
      visitsIds: [visits[0].id],
      reason: 'Brak'
    };
    spyOn(component.onVisitsStatusModified, 'emit');

    expect(component.onVisitsStatusModified.emit).not.toHaveBeenCalled();
    component.selection.select(visits[0]);
    component.modifyVisitsStatus(status);
    expect(component.onVisitsStatusModified.emit).toHaveBeenCalledWith(
      expected
    );
  });

  it('should render div containing text "Brak wizyt" if there is no vistis', () => {
    component.visits = [];
    fixture.detectChanges();

    const noVisitsEl = fixture.nativeElement.querySelector('.table__row');
    expect(noVisitsEl.textContent.trim()).toEqual('Brak wizyt');
  });

  it('should call dialog.open when cancelVisit method is called', () => {
    spyOn(dialog, 'open').and.callThrough();
    const visit = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z'
    };

    expect(dialog.open).not.toHaveBeenCalled();
    component.cancelVisit(visit);
    expect(dialog.open).toHaveBeenCalledWith(DialogConfirmationComponent, {
      data: { title: 'Czy na pewno chcesz usunąć rezerwację wizyty?' }
    });
  });

  it('should call dialog.open when showMore method is called', () => {
    spyOn(dialog, 'open').and.callThrough();
    const visit = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z'
    };
    component.isDoctor = false;

    expect(dialog.open).not.toHaveBeenCalled();
    component.showMore(visit);
    expect(dialog.open).toHaveBeenCalledWith(DialogVisitMoreComponent, {
      width: '600px',
      data: { visit, isDoctor: false }
    });
  });
});
