import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitsTabComponent } from './visits-tab.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromVisits from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import * as fromRoot from '../../../core/reducers';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import {
  AlertFactoryService,
  ALERT_TYPE
} from 'src/app/core/components/alert/alert-factory.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { VisitType, VisitStatus } from '../../models/visit';
import { SetFilter, ResetFilter } from '../../actions/visits-filter.action';
import { GetVisits, CancelVisit } from '../../actions/visits.action';
import { UpdateStatus } from '../../actions/visits-status.action';

describe('VisitsTabComponent', () => {
  let component: VisitsTabComponent;
  let fixture: ComponentFixture<VisitsTabComponent>;
  let store: Store<fromRoot.State>;
  let alertFactory: AlertFactoryService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          visits: combineReducers(fromVisits.reducers),
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      declarations: [VisitsTabComponent],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => VisitType.PAST }),
            queryParamMap: of({ get: () => 'John Doe' })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    alertFactory = TestBed.get(AlertFactoryService);
    activatedRoute = TestBed.get(ActivatedRoute);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(alertFactory, 'create');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call alertService.create when alert action is called', () => {
    const payload = { message: 'Testowa', alertType: ALERT_TYPE.SUCCESS };
    const action = new AlertShow(payload);

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

    store.dispatch(action);

    component.alert$.subscribe(error => {
      expect(alertFactory.create).not.toHaveBeenCalled();
    });
  });

  it('should dispatch SetFilter action and GetVisits action when onFilterChanged method is called', () => {
    const filter = {
      type: VisitType.CURRENT
    };
    const action1 = new SetFilter(filter);
    const action2 = new GetVisits();

    component.onFilterChanged(filter);

    expect(store.dispatch).toHaveBeenCalledWith(action1);
    expect(store.dispatch).toHaveBeenCalledWith(action2);
  });

  it('should dispatch UpdateStatus action when onVisitsStatusModified method is called', () => {
    const visitsToUpdate = {
      status: VisitStatus.ACCEPTED,
      visitsIds: [1],
      reason: ''
    };
    const action = new UpdateStatus(visitsToUpdate);

    component.onVisitsStatusModified(visitsToUpdate);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch CancelVisit action when onVisitCanceled method is called', () => {
    const visit = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z'
    };
    const action = new CancelVisit(visit);

    component.onVisitCanceled(visit);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
