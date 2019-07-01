import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsFilterComponent } from './visits-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitStatus, VisitType } from '../../models/visit';
import { MatSelectChange } from '@angular/material';

describe('VisitsFilterComponent', () => {
  let component: VisitsFilterComponent;
  let fixture: ComponentFixture<VisitsFilterComponent>;
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
      declarations: [VisitsFilterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should isCurrentTab return true if filter.type equals current', () => {
    component.filter = filter;
    fixture.detectChanges();

    expect(component.isCurrentTab).toBe(true);
  });

  it('should isCurrentTab return false if filter.type equals past', () => {
    component.filter = { type: VisitType.PAST };
    fixture.detectChanges();

    expect(component.isCurrentTab).toBe(false);
  });

  it('should checkboxLabel method return "select all" label', () => {
    component.allRowsHaveValue = true;
    fixture.detectChanges();

    expect(component.checkboxLabel()).toBe('select all');
  });

  it('should checkboxLabel method return "deselect all" label', () => {
    component.allRowsHaveValue = false;
    fixture.detectChanges();

    expect(component.checkboxLabel()).toBe('deselect all');
  });

  it('should call onSelectBtnClicked.emit method when the selectAll method is called', () => {
    spyOn(component.onSelectBtnClicked, 'emit');

    expect(component.onSelectBtnClicked.emit).not.toHaveBeenCalled();
    component.selectAll();
    expect(component.onSelectBtnClicked.emit).toHaveBeenCalled();
  });

  it('should call onFilterChanged.emit when the selectionChange method is called', () => {
    const selectChange: MatSelectChange = {
      source: null,
      value: VisitStatus.CANCELED
    };
    spyOn(component.onFilterChanged, 'emit');
    component.filter = filter;
    fixture.detectChanges();

    expect(component.filter.status).toEqual(VisitStatus.ALL);
    expect(component.onFilterChanged.emit).not.toHaveBeenCalled();
    component.selectionChange(selectChange);
    expect(component.filter.status).toEqual(VisitStatus.CANCELED);
    expect(component.onFilterChanged.emit).toHaveBeenCalledWith(filter);
  });
});
