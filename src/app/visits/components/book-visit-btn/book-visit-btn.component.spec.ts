import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVisitBtnComponent } from './book-visit-btn.component';

describe('BookVisitBtnComponent', () => {
  let component: BookVisitBtnComponent;
  let fixture: ComponentFixture<BookVisitBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookVisitBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVisitBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
