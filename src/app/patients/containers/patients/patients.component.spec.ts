import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsComponent } from './patients.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromAccounts from '../../../account/reducers';
import * as fromPatients from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import {
  AlertFactoryService,
  ALERT_TYPE
} from '../../../core/components/alert/alert-factory.service';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { SetFilter } from '../../actions/patients-filter.action';
import { GetPatients, RemovePatient } from '../../actions/patients.action';
import { CreatePatient } from '../../actions/create-patient.action';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;
  let store: Store<fromRoot.State>;
  let alertFactory: AlertFactoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          accounts: combineReducers(fromAccounts.reducers),
          patients: combineReducers(fromPatients.reducers)
        })
      ],
      declarations: [PatientsComponent],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    alertFactory = TestBed.get(AlertFactoryService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(alertFactory, 'create');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the GetPatient action when ngOnInit is called', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new GetPatients());
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
      email: 'john@example.com'
    };
    const action1 = new SetFilter(filter);
    const action2 = new GetPatients();

    component.onFilterChanged(filter);

    expect(store.dispatch).toHaveBeenCalledWith(action1);
    expect(store.dispatch).toHaveBeenCalledWith(action2);
  });

  it('should dispatch CreatePatient action when createPatient method is called', () => {
    const user = {
      id: '1',
      email: 'john@example.com'
    };
    const action = new CreatePatient(user);
    
    component.createPatient(user);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch RemovePatient action when onPatientRemoved method is called', () => {
    const user = {
      id: '1'
    };
    const action = new RemovePatient(user);

    component.onPatientRemoved(user);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should component have a title "Lista pacjentów"', () => {
    const title = fixture.nativeElement.querySelector('.app-title');
    expect(title.textContent.trim()).toEqual('Lista pacjentów');
  });
});
