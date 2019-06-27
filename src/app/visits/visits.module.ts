import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsTableComponent } from './components/visits-table/visits-table.component';
import { StoreModule } from '@ngrx/store';
import * as fromVisits from './reducers';
import { VisitsTabComponent } from './containers/visits-tab/visits-tab.component';
import { MaterialModule } from '../material/material.module';
import { VisitsStatusComponent } from './components/visits-status/visits-status.component';
import { FilterCellComponent } from './components/filter-cell/filter-cell.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';
import { VisitStatusPipe } from './pipes/visit-status.pipe';
import { VisitsFilterComponent } from './components/visits-filter/visits-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { VisitEffects } from './effects/visit.effects';
import { VisitsComponent } from './containers/visits/visits.component';

@NgModule({
  declarations: [
    VisitsTableComponent,
    VisitsTabComponent,
    VisitsStatusComponent,
    FilterCellComponent,
    FilterRowComponent,
    VisitStatusPipe,
    VisitsFilterComponent,
    VisitsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('visits', fromVisits.reducers),
    EffectsModule.forFeature([VisitEffects]),
    VisitsRoutingModule
  ]
})
export class VisitsModule {}
