import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromPatients from './reducers';
import { PatientsEffects } from './effects/patients.effects';
import { EffectsModule } from '@ngrx/effects';
import { PatientsComponent } from './containers/patients/patients.component';
import { PatientsTableComponent } from './components/patients-table/patients-table.component';
import { PatientsFilterComponent } from './components/patients-filter/patients-filter.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { DialogCreatePatientComponent } from './components/dialog-create-patient/dialog-create-patient.component';
import { CreatePatientEffects } from './effects/create-patient.effects';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientsTableComponent,
    PatientsFilterComponent,
    CreatePatientComponent,
    DialogCreatePatientComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('patients', fromPatients.reducers),
    EffectsModule.forFeature([PatientsEffects, CreatePatientEffects]),
    PatientsRoutingModule
  ],
  entryComponents: [
    DialogCreatePatientComponent
  ]
})
export class PatientsModule {}
