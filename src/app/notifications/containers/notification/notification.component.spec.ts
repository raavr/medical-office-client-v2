import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../core/reducers';
import * as fromNotification from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { NotificationSocketService } from '../../services/notification-socket.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  SetNotificationsCounter,
  GetNotifications,
  StopNotificationAnimation,
  MarkAsRead,
  MarkAllAsRead
} from '../../actions/notification.actions';
import { PatientNotification } from '../../models/patient-notification.interface';
import { VisitStatus } from 'src/app/visits/models/visit';
import { UpdateStatus } from 'src/app/visits/actions/visits-status.action';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationSocket: NotificationSocketService;
  let store: Store<fromRoot.State>;
  let notification: PatientNotification;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          notification: combineReducers(fromNotification.reducers),
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      declarations: [NotificationComponent],
      providers: [
        {
          provide: NotificationSocketService,
          useValue: {
            init: () => {},
            notificationEvent$: of(2)
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    notificationSocket = TestBed.get(NotificationSocketService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    notification = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z',
      doctor: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      },
      notification: { id: 111, status: 'read', type: 'danger' }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init notificationSocket service', () => {
    spyOn(notificationSocket, 'init');
    expect(notificationSocket.init).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(notificationSocket.init).toHaveBeenCalled();
  });

  it('should dispatch SetNotificationCounter action when the notificationSocket service emits the value', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new SetNotificationsCounter(2));
  });

  it('should dispatch the GetNotifications action and the StopNotificationAnimation when getNotifications method is called', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.getNotifications();
    expect(store.dispatch).toHaveBeenCalledWith(new GetNotifications());
    expect(store.dispatch).toHaveBeenCalledWith(
      new StopNotificationAnimation()
    );
  });

  it('should dispatch the MarkAsRead action when the markAsRead method is called', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.markAsRead(notification);
    expect(store.dispatch).toHaveBeenCalledWith(new MarkAsRead(notification));
  });

  it('should dispatch the MarkAllAsRead action when the markAllAsRead method is called', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    component.markAllAsRead();
    expect(store.dispatch).toHaveBeenCalledWith(new MarkAllAsRead());
  });

  it('should dispatch the UpdateStatus action when the onVisitsStatusModified method is called', () => {
    const visitUpdate = {
      status: VisitStatus.ACCEPTED,
      visitsIds: [1, 2]
    };
    expect(store.dispatch).not.toHaveBeenCalled();
    component.onVisitsStatusModified(visitUpdate);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateStatus(visitUpdate));
  });
});
