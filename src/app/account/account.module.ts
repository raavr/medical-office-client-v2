import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './containers/account/account.component';
import { StoreModule } from '@ngrx/store';
import * as fromAccounts from './reducers';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './effects/profile.effects';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    StoreModule.forFeature('accounts', fromAccounts.reducers),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class AccountModule { }
