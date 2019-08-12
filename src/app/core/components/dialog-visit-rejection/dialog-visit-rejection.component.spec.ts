import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisitRejectionComponent } from './dialog-visit-rejection.component';

describe('DialogVisitRejectionComponent', () => {
  let component: DialogVisitRejectionComponent;
  let fixture: ComponentFixture<DialogVisitRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVisitRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVisitRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
