import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { DashboardGridComponent } from './dashboard-grid.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardGridComponent', () => {
  let component: DashboardGridComponent;
  let fixture: ComponentFixture<DashboardGridComponent>;
  let store: MockStore<fromRoot.State>;
  const initialState = {
    auth: { session: { user: { role: 'user' } } }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      declarations: [DashboardGridComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display four <app-dashboard-grid-item> elements if isDoctor equals true', () => {
    const appDashboardItems = fixture.nativeElement.querySelectorAll(
      'app-dashboard-grid-item'
    );
    expect(appDashboardItems.length).toEqual(2);
  });

  it('should display two <app-dashboard-grid-item> elements if isDoctor equals false', () => {
    store.setState({
      auth: { session: { user: { role: 'doctor' } } }
    } as fromAuth.State);
    fixture.detectChanges();
    const appDashboardItems = fixture.nativeElement.querySelectorAll(
      'app-dashboard-grid-item'
    );
    expect(appDashboardItems.length).toEqual(4);
  });
});
