import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  Visit,
  VisitStatus,
  VisitsStatusUpdateDto
} from '../../../visits/models/visit';
import { PatientNotification } from '../../models/patient-notification.interface';
import { MatDialog } from '@angular/material';
import { DialogPatientNotificationComponent } from '../dialog-patient-notification/dialog-patient-notification.component';
import { filter } from 'rxjs/operators';
import { DialogDoctorNotificationComponent } from '../dialog-doctor-notification/dialog-doctor-notification.component';
import { Router } from '@angular/router';
import { DialogVisitRejectionComponent } from '../../../core/components/dialog-visit-rejection/dialog-visit-rejection.component';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationMenuComponent implements OnInit {
  @Input() notifications: Visit[] | PatientNotification[] = [];
  @Input() pending: boolean;
  @Input() totalItems: number;
  @Input() isAnimationRunning: boolean;
  @Input() isDoctor: boolean;
  @Output() getNotifications = new EventEmitter<any>();
  @Output() markAsRead = new EventEmitter<PatientNotification>();
  @Output() markAllAsRead = new EventEmitter<null>();
  @Output() modifyVisitStatus = new EventEmitter<VisitsStatusUpdateDto>();

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  onPatientNotificationClicked(notification: PatientNotification) {
    const dialogRef = this.dialog.open(DialogPatientNotificationComponent, {
      data: {
        notification
      }
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(_ => this.markAsRead.emit(notification));
  }

  onDoctorNotificationClicked(notification: Visit) {
    const dialogRef = this.dialog.open(DialogDoctorNotificationComponent, {
      data: {
        notification
      }
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((status: VisitStatus) =>
        status === VisitStatus.ACCEPTED
          ? this.modifyVisitStatus.emit({
              status,
              visitsIds: [notification.id]
            })
          : this.openRejectionDialog(notification, status)
      );
  }

  private openRejectionDialog(notification: Visit, status: VisitStatus) {
    const dialogRef = this.dialog.open(DialogVisitRejectionComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(({ reason }) =>
      this.modifyVisitStatus.emit({
        status,
        visitsIds: [notification.id],
        reason
      })
    );
  }

  onFooterBtnClicked() {
    this.isDoctor
      ? this.router.navigate(['/dashboard/visits/current'], {
          queryParams: { status: VisitStatus.RESERVED }
        })
      : this.markAllAsRead.emit();
  }
}
