import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromNavbar from './navbar/reducers';
import * as fromRoot from './core/reducers';
import * as fromAuth from './auth/reducers';
import * as fromAccounts from './account/reducers';
import {
  AlertFactoryService,
  ALERT_TYPE
} from './core/components/alert/alert-factory.service';
import { AlertShow } from './core/actions/alert.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromAuth.State>;
  let component: AppComponent;
  let alertFactory: AlertFactoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          navbar: combineReducers(fromNavbar.reducers),
          auth: combineReducers(fromAuth.reducers),
          accounts: combineReducers(fromAccounts.reducers),
        })
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    alertFactory = TestBed.get(AlertFactoryService);

    spyOn(alertFactory, 'create');
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a router-outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeDefined();
  });

  it('should call alertService.create when alert action is called', () => {
    const payload = { message: 'Testowa', alertType: ALERT_TYPE.SUCCESS };
    const action = new AlertShow(payload);
    component.ngOnInit();
    store.dispatch(action);

    component.alert$.subscribe(error => {
      expect(error.message).toEqual(payload.message);
      expect(alertFactory.create).toHaveBeenCalledWith(error.message, {
        type: ALERT_TYPE.SUCCESS
      });
    });
  });

  it('should not call alertService.create when alert action is called and payload.message is empty', () => {
    const payload = { message: '', alertType: ALERT_TYPE.WARN };
    const action = new AlertShow(payload);
    component.ngOnInit();
    store.dispatch(action);

    component.alert$.subscribe(error => {
      expect(alertFactory.create).not.toHaveBeenCalled();
    });
  });
});
