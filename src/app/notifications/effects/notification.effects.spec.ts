import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { NotificationEffects } from './notification.effects';
import { NotificationService } from '../services/notification.service';
import { hot, cold } from 'jasmine-marbles';
import * as utilFun from '../../core/utils/utils';
import { NotificationSocketService } from '../services/notification-socket.service';
import {
  GetNotifications,
  ResetNotifications,
  GetNotificationsSuccess,
  GetNotificationsFailure,
  RunNotificationAnimation,
  SetNotificationsCounter,
  MarkAsRead,
  MarkAllAsRead
} from '../actions/notification.actions';
import { VisitStatus, Visit } from 'src/app/visits/models/visit';
import { Logout } from 'src/app/auth/actions/auth.actions';
import { PatientNotification } from '../models/patient-notification.interface';

describe('NotificationEffects', () => {
  let actions$: Observable<any>;
  let effects: NotificationEffects;
  let notificationService: NotificationService;
  let notificationSocket: NotificationSocketService;
  let status: number;
  let notifications: Visit[];
  let patientNotification: PatientNotification;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationEffects,
        provideMockActions(() => actions$),
        {
          provide: NotificationService,
          useValue: {
            getNotifications: () => {},
            markAllAsRead: () => of({}),
            markAsRead: () => of({})
          }
        },
        {
          provide: NotificationSocketService,
          useValue: {
            disconnect: () => {},
            init: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(NotificationEffects);
    notificationService = TestBed.get(NotificationService);
    notificationSocket = TestBed.get(NotificationSocketService);
    status = 401;
  });

  beforeEach(() => {
    notifications = [
      {
        createDate: '2019-08-13T07:30:00.000Z',
        description: 'Zapis',
        id: 124,
        status: VisitStatus.ACCEPTED,
        visitDate: '2019-08-13T08:30:00.000Z',
        patient: {
          id: '1',
          name: 'John',
          surname: 'Doe'
        }
      },
      {
        createDate: '2019-08-14T10:30:00.000Z',
        description: 'Desc',
        id: 125,
        status: VisitStatus.ACCEPTED,
        visitDate: '2019-08-14T10:30:00.000Z',
        patient: {
          id: '1',
          name: 'John',
          surname: 'Doe'
        }
      }
    ];

    patientNotification = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.CANCELED,
      visitDate: '2019-08-13T08:30:00.000Z',
      doctor: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      },
      rejectReason: 'Rejected',
      notification: { id: 111, status: 'read', type: 'danger' }
    };
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the ResetNotifications action, the GetNotificationsSuccess action if getNotification effect succeeds', () => {
    const action = new GetNotifications();
    const completion = [
      new ResetNotifications(),
      new GetNotificationsSuccess(notifications)
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: notifications });
    const expected = cold('--(bc)', {
      b: completion[0],
      c: completion[1]
    });
    notificationService.getNotifications = () => response;
    expect(effects.getNotification$).toBeObservable(expected);
  });

  it('should return the "error" actions if getNotification effect fails', () => {
    const message = 'Error';

    const action = new GetNotifications();
    const completion = [new GetNotificationsFailure()];
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue(completion);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', {
      b: completion[0]
    });
    notificationService.getNotifications = () => response;

    expect(effects.getNotification$).toBeObservable(expected);
  });

  it('should return the RunNotificationAnimation action if getNotificationsCounter effect succeeds', () => {
    const action = new SetNotificationsCounter(5);
    const completion = [new RunNotificationAnimation()];
    actions$ = hot('--a---', { a: action });
    const expected = cold('--b', { b: completion[0] });

    expect(effects.getNotificationsCounter$).toBeObservable(expected);
  });

  it('should return undefined if getNotificationsCounter effect succeeds', () => {
    const action = new SetNotificationsCounter(-1);
    actions$ = hot('-a---', { a: action });
    const expected = cold('--');
    expect(effects.getNotificationsCounter$).toBeObservable(expected);
  });

  it('should call notificationSocket.disconnect if logout effect is called', () => {
    spyOn(notificationSocket, 'disconnect');
    const action = new Logout();
    actions$ = cold('a', { a: action });
    effects.logout$.subscribe(() => {
      expect(notificationSocket.disconnect).toHaveBeenCalled();
    });
  });

  it('should call notificationService.markAsRead if markNotificationAsRead effect is called', () => {
    spyOn(notificationService, 'markAsRead').and.callThrough();
    const action = new MarkAsRead(patientNotification);
    actions$ = cold('a', { a: action });
    effects.markNotificationAsRead$.subscribe(() => {
      expect(notificationService.markAsRead).toHaveBeenCalledWith(
        patientNotification
      );
    });
  });

  it('should call notificationService.markAllAsRead if markAllNotificationAsRead effect is called', () => {
    spyOn(notificationService, 'markAllAsRead').and.callThrough();
    const action = new MarkAllAsRead();
    actions$ = cold('a', { a: action });
    effects.markAllNotificationAsRead$.subscribe(() => {
      expect(notificationService.markAllAsRead).toHaveBeenCalled();
    });
  });
});
