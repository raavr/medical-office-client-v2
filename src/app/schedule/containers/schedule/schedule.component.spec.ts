import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../core/reducers';
import * as fromSchedule from '../../reducers';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UpdateVisitTimes, UpdateDisabledDates, UpdateWeeklyVisitTimes, GetFullSchedule } from '../../actions/schedule.action';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let store: Store<fromRoot.State>;

  const visitDatetimes = {
    times: ["10:30"],
    weeklyVisitTimes: [
      {
        dayOfWeek: 1,
        visitTime: [{ time: "10:00", selected: true }]
      }
    ],
    disabledDates: ["12/08/2019"]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          schedule: combineReducers(fromSchedule.reducers),
        })
      ],
      declarations: [ ScheduleComponent ],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h2 element containing "Grafik wizyt" title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toEqual('Grafik wizyt');
  });

  it('should disaptch the UpdateVisitTimes action', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.updateVisitTimes(visitDatetimes.times);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateVisitTimes(visitDatetimes.times));
  });

  it('should disaptch the UpdateDisabledDates action', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.updateDisabledDates(visitDatetimes.disabledDates);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateDisabledDates(visitDatetimes.disabledDates));
  });

  it('should disaptch the UpdateWeeklyVisitTimes action', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.updateWeeklyTimes(visitDatetimes.weeklyVisitTimes);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateWeeklyVisitTimes(visitDatetimes.weeklyVisitTimes));
  });

  it('should dispatch the GetFullSchedule action', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new GetFullSchedule());
  })
});
