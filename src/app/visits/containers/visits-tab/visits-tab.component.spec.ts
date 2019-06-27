import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsTabComponent } from './visits-tab.component';

describe('VisitsTabComponent', () => {
  let component: VisitsTabComponent;
  let fixture: ComponentFixture<VisitsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
