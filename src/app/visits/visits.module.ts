import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsTableComponent } from './components/visits/visits-table.component';
import { StoreModule } from '@ngrx/store';
import * as fromVisits from './reducers';
import { VisitsComponent } from './containers/visits/visits.component';
import { MaterialModule } from '../material/material.module';
import { StatusButtonComponent } from './components/status-button/status-button.component';
import { FilterCellComponent } from './components/filter-cell/filter-cell.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';
import { VisitStatusPipe } from './pipes/visit-status.pipe';
import { VisitsFilterComponent } from './components/visits-filter/visits-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { VisitEffects } from './effects/visit.effects';

@NgModule({
  declarations: [
    VisitsTableComponent,
    VisitsComponent,
    StatusButtonComponent,
    FilterCellComponent,
    FilterRowComponent,
    VisitStatusPipe,
    VisitsFilterComponent
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
