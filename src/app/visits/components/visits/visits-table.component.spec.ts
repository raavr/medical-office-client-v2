import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsTableComponent } from './visits-table.component';

describe('VisitsTableComponent', () => {
  let component: VisitsTableComponent;
  let fixture: ComponentFixture<VisitsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
