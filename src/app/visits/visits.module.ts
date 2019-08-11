import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsTableComponent } from './components/visits-table/visits-table.component';
import { StoreModule } from '@ngrx/store';
import * as fromVisits from './reducers';
import { VisitsTabComponent } from './containers/visits-tab/visits-tab.component';
import { MaterialModule } from '../material/material.module';
import { VisitsStatusComponent } from './components/visits-status/visits-status.component';
import { VisitStatusPipe } from './pipes/visit-status.pipe';
import { VisitsFilterComponent } from './components/visits-filter/visits-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { VisitEffects } from './effects/visit.effects';
import { VisitsComponent } from './containers/visits/visits.component';
import { DoctorActionComponent } from './components/doctor-action/doctor-action.component';
import { BookVisitBtnComponent } from './components/book-visit-btn/book-visit-btn.component';
import { DialogBookVisitComponent } from './components/dialog-book-visit/dialog-book-visit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookVisitEffects } from './effects/book-visit.effects';
import { MomentDateModule } from '../material/moment-date.module';
import { CoreModule } from '../core/core.module';
import { BookVisitComponent } from './components/book-visit/book-visit.component';
import { DialogVisitMoreComponent } from './components/dialog-visit-more/dialog-visit-more.component';

@NgModule({
  declarations: [
    VisitsTableComponent,
    VisitsTabComponent,
    VisitsStatusComponent,
    VisitStatusPipe,
    VisitsFilterComponent,
    VisitsComponent,
    DoctorActionComponent,
    BookVisitBtnComponent,
    DialogBookVisitComponent,
    BookVisitComponent,
    DialogVisitMoreComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentDateModule.forFeature(),
    StoreModule.forFeature('visits', fromVisits.reducers),
    EffectsModule.forFeature([VisitEffects, BookVisitEffects]),
    VisitsRoutingModule
  ],
  entryComponents: [DialogBookVisitComponent, DialogVisitMoreComponent]
})
export class VisitsModule {}
