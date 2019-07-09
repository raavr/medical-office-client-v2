import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { VisitsComponent } from './visits.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromVisits from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { GetUnavailableDates, GetDoctors, BookVisit, GetPatientsByName } from '../../actions/book-visit.action';

describe('VisitsComponent', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;
  let hostElement: HTMLElement;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          visits: combineReducers(fromVisits.reducers),
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      declarations: [VisitsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.nativeElement;

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <router-outlet> element', () => {
    const router = hostElement.querySelector('router-outlet');
    expect(router).not.toBeNull();
  });

  it('should render two links with specific labels', () => {
    const links = hostElement.querySelectorAll('a');
    fixture.detectChanges();

    expect(links.length).toBe(2);
    expect(links[0].textContent.trim()).toEqual('Aktualne');
    expect(links[1].textContent.trim()).toEqual('Historyczne');
  });

  it('should render h2', () => {
    const h2 = hostElement.querySelector('h2');
    fixture.detectChanges();

    expect(h2.textContent).toEqual('Moje wizyty');
  });

  it('should render <app-book-visit> component', () => {
    const bookVisitComp = hostElement.querySelector('app-book-visit');
    fixture.detectChanges();

    expect(bookVisitComp).not.toBeNull();
  });

  it('should dispatch GetUnavailableDates action when bookVisit method is called and isDoctor arg equals true', () => {
    const isDoctor = true;
    const action = new GetUnavailableDates();

    component.bookVisit(isDoctor);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch GetDoctors action when bookVisit method is called and isDoctor arg equals false', () => {
    const isDoctor = false;
    const action = new GetDoctors();

    component.bookVisit(isDoctor);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch BookVisit action when onDialogClosed method is called', () => {
    const visitReservation = {
      date: '25/08/2019',
      time: '10:30',
      userId: '1'
    };
    const action = new BookVisit(visitReservation);

    component.onDialogClosed(visitReservation);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch GetPatientsByName action when onPatientNameChanged method is called ', () => {
    const name = "Ra"
    const action = new GetPatientsByName(name);

    component.onPatientNameChanged(name);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch GetUnavailableDates action when onDoctorSelected method is called ', () => {
    const doctorId = '1';
    const action = new GetUnavailableDates(doctorId);

    component.onDoctorSelected(doctorId);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
