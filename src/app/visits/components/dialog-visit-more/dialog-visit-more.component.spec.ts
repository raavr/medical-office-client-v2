import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisitMoreComponent } from './dialog-visit-more.component';

describe('DialogVisitMoreComponent', () => {
  let component: DialogVisitMoreComponent;
  let fixture: ComponentFixture<DialogVisitMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVisitMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVisitMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
