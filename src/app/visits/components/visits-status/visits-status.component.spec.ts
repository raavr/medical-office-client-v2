import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsStatusComponent } from './visits-status.component';
import { VisitStatus } from '../../models/visit';

describe('VisitsStatusComponent', () => {
  let component: VisitsStatusComponent;
  let fixture: ComponentFixture<VisitsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the color prop equals "mat-success" if the status input equals "accepted"', () => {
    component.status = VisitStatus.ACCEPTED;
    fixture.detectChanges();

    expect(component.color).toEqual('mat-success');
  });

  it('should the color prop equals "mat-warn" if the status input equals "canceled"', () => {
    component.status = VisitStatus.CANCELED;
    fixture.detectChanges();

    expect(component.color).toEqual('mat-warn');
  });

  it('should the color prop equals "mat-amber" if the status input is not equal "accepted" and "canceled"', () => {
    component.status = VisitStatus.RESERVED;
    fixture.detectChanges();

    expect(component.color).toEqual('mat-amber');
  });

  it('should render visits__status class', () => {
    const vStatusClass = fixture.nativeElement.querySelector('.visits__status');
    expect(vStatusClass).not.toBeNull();
  });

  it('should render visits__status class and mat-success class', () => {
    component.status = VisitStatus.ACCEPTED;
    fixture.detectChanges();

    const hostSpan = fixture.nativeElement.querySelector('span');
    expect(hostSpan.getAttribute('class')).toEqual('visits__status mat-success');
  })
});
