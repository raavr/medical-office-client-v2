import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../core/reducers';
import * as fromNotification from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { Observable, Subject } from 'rxjs';
import { Visit, VisitsStatusUpdateDto } from '../../../visits/models/visit';
import {
  GetNotifications,
  SetNotificationsCounter,
  StopNotificationAnimation,
  MarkAsRead,
  MarkAllAsRead
} from '../../actions/notification.actions';
import { NotificationSocketService } from '../../services/notification-socket.service';
import { takeUntil } from 'rxjs/operators';
import { PatientNotification } from '../../models/patient-notification.interface';
import { UpdateStatus } from 'src/app/visits/actions/visits-status.action';

@Component({
  selector: 'app-notification',
  template: `
    <app-notification-menu
      [notifications]="notifications$ | async"
      [pending]="pending$ | async"
      [totalItems]="totalItems$ | async"
      [isAnimationRunning]="animationPending$ | async"
      [isDoctor]="isDoctor$ | async"
      (getNotifications)="getNotifications()"
      (markAsRead)="markAsRead($event)"
      (markAllAsRead)="markAllAsRead()"
      (modifyVisitStatus)="onVisitsStatusModified($event)"
    >
    </app-notification-menu>
  `,
  styles: []
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<Visit[] | PatientNotification[]>;
  pending$: Observable<boolean>;
  totalItems$: Observable<number>;
  animationPending$: Observable<boolean>;
  isDoctor$: Observable<boolean>;
  private unsub$ = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private notificationSocket: NotificationSocketService
  ) {
    this.notifications$ = store.pipe(select(fromNotification.getNotifications));
    this.pending$ = store.pipe(select(fromNotification.getPending));
    this.totalItems$ = store.pipe(select(fromNotification.getTotalItems));
    this.animationPending$ = store.pipe(
      select(fromNotification.getAnimationPending)
    );
    this.isDoctor$ = store.pipe(select(fromAuth.isDoctor));
  }

  ngOnInit() {
    this.notificationSocket.init();
    this.notificationSocket.notificationEvent$
      .pipe(takeUntil(this.unsub$))
      .subscribe(count =>
        this.store.dispatch(new SetNotificationsCounter(count))
      );
  }

  getNotifications() {
    this.store.dispatch(new GetNotifications());
    this.store.dispatch(new StopNotificationAnimation());
  }

  markAsRead(notification: PatientNotification) {
    this.store.dispatch(new MarkAsRead(notification));
  }

  markAllAsRead() {
    this.store.dispatch(new MarkAllAsRead());
  }

  onVisitsStatusModified(visitsToUpdate: VisitsStatusUpdateDto) {
    this.store.dispatch(new UpdateStatus(visitsToUpdate));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
