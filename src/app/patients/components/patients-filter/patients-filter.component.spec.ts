import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PatientsFilterComponent } from './patients-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PatientsFilterComponent', () => {
  let component: PatientsFilterComponent;
  let fixture: ComponentFixture<PatientsFilterComponent>;
  const filter = {
    currentPage: 1,
    limit: 10,
    name: '',
    email: ''
  };

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
    component.filter = filter;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the filter name property when typeText method is called', fakeAsync(() => {
    component.ngOnInit();
    spyOn(component.onFilterChanged, 'emit');
    
    expect(component.filter.name).toEqual('');
    component.typeText({ value: 'John', type: 'name' });
    
    tick(500);
    
    expect(component.filter.name).toEqual('John');
    expect(component.onFilterChanged.emit).toHaveBeenCalled();
  }));

  it('should set the filter email property when typeText method is called', fakeAsync(() => {
    component.ngOnInit();
    spyOn(component.onFilterChanged, 'emit');
    
    expect(component.filter.email).toEqual('');
    component.typeText({ value: 'john@example.com', type: 'email' });
    
    tick(500);
    
    expect(component.filter.email).toEqual('john@example.com');
    expect(component.onFilterChanged.emit).toHaveBeenCalled();
  }));
});
