import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBookVisitComponent } from './dialog-book-visit.component';

describe('DialogBookVisitComponent', () => {
  let component: DialogBookVisitComponent;
  let fixture: ComponentFixture<DialogBookVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBookVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBookVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
