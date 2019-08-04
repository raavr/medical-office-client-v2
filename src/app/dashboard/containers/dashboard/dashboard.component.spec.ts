import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<fromRoot.State>;
  const initialState = {
    auth: { session: { user: { role: 'doctor' } } }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      declarations: [DashboardComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <router-outlet> element', () => {
    const router = fixture.nativeElement.querySelector('router-outlet');
    expect(router).not.toBeNull();
  });

  it('should show the app-dashboard-menu component when the isDoctor prop equals true', () => {
    const dashMenu = fixture.nativeElement.querySelector('app-dashboard-menu');
    expect(dashMenu).not.toBeNull();
  });

  it('should div have the class dashboard__router when the isDoctor prop equals true', () => {
    const dashMenu = fixture.nativeElement.querySelector('.dashboard__router');
    expect(dashMenu).not.toBeNull();
  });

  it('should hide app-dashboard-menu component when the isDoctor prop equals false', () => {
    component.isDoctor = false;
    fixture.detectChanges()
    const dashMenu = fixture.nativeElement.querySelector('app-dashboard-menu');
    expect(dashMenu).toBeNull();
  });
  
  it('shouldn\'t div have the class dashboard__router when the isDoctor prop equals false', () => {
    component.isDoctor = false;
    fixture.detectChanges()
    const dashMenu = fixture.nativeElement.querySelector('.dashboard__router');
    expect(dashMenu).toBeNull();
  });
});
