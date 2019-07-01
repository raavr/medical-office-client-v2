import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCellComponent } from './filter-cell.component';
import { By } from '@angular/platform-browser';

describe('FilterCellComponent', () => {
  let component: FilterCellComponent;
  let fixture: ComponentFixture<FilterCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set class is-doctor if showDoctorCell is equal true', () => {
    component.showDoctorCell = true;
    fixture.detectChanges();

    const hostEl = fixture.debugElement.nativeElement;
    expect(hostEl.getAttribute('class')).toEqual('is-doctor');
  });

  it('should not set class is-doctor if showDoctorCell is equal false', () => {
    component.showDoctorCell = false;
    fixture.detectChanges();

    const hostEl = fixture.debugElement.nativeElement;
    expect(hostEl.getAttribute('class')).toBeNull();
  })
});
