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
import { DisabledDatesComponent } from './components/disabled-dates/disabled-dates.component';
import { MomentDateModule } from '../material/moment-date.module';
import { DayOfWeekComponent } from './components/day-of-week/day-of-week.component';
import { DayOfWeekListComponent } from './components/day-of-week-list/day-of-week-list.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    VisitTimeComponent,
    DisabledDatesComponent,
    DayOfWeekComponent,
    DayOfWeekListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentDateModule.forFeature(),
    StoreModule.forFeature('schedule', fromSchedule.reducers),
    EffectsModule.forFeature([ScheduleEffects]),
    ScheduleRoutingModule
  ]
})
export class ScheduleModule {}
