import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardGridItemComponent } from './dashboard-grid-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardGridItemComponent', () => {
  let component: DashboardGridItemComponent;
  let fixture: ComponentFixture<DashboardGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ DashboardGridItemComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <a> element', () => {
    const link = fixture.nativeElement.querySelector('.dashboard__grid-item');
    expect(link).not.toBeNull();
  });

  it('should render <a> element with a specific href', () => {
    component.link = '/test';
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('.dashboard__grid-item');
    expect(link.getAttribute('href')).toEqual('/test');
  });
});
