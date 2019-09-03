import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationMenuComponent } from './components/notification-menu/notification-menu.component';
import { MaterialModule } from '../material/material.module';
import { NotificationComponent } from './containers/notification/notification.component';
import { StoreModule } from '@ngrx/store';
import * as fromNotification from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './effects/notification.effects';
import { NotificationTypePipe } from './pipes/notification-type.pipe';
import { NotificationItemDoctorComponent } from './components/notification-item-doctor/notification-item-doctor.component';
import { NotificationItemPatientComponent } from './components/notification-item-patient/notification-item-patient.component';
import { DialogPatientNotificationComponent } from './components/dialog-patient-notification/dialog-patient-notification.component';
import { DialogDoctorNotificationComponent } from './components/dialog-doctor-notification/dialog-doctor-notification.component';
import { DoctorActionEffects } from '../visits/effects/doctor-action.effects';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    NotificationMenuComponent,
    NotificationComponent,
    NotificationTypePipe,
    NotificationItemDoctorComponent,
    NotificationItemPatientComponent,
    DialogPatientNotificationComponent,
    DialogDoctorNotificationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    StoreModule.forFeature('notification', fromNotification.reducers),
    EffectsModule.forFeature([NotificationEffects, DoctorActionEffects])
  ],
  entryComponents: [
    DialogPatientNotificationComponent,
    DialogDoctorNotificationComponent
  ],
  exports: [NotificationComponent]
})
export class NotificationsModule {}
