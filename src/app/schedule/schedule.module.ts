import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { VisitTimeComponent } from './components/visit-time/visit-time.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromSchedule from './reducers';
import { ScheduleEffects } from './effects/schedule.effects';

@NgModule({
  declarations: [ScheduleComponent, VisitTimeComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('schedule', fromSchedule.reducers),
    EffectsModule.forFeature([
      ScheduleEffects,
    ]),
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
