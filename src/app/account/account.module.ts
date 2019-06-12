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
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PasswordEffects } from './effects/password.effects';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    StoreModule.forFeature('accounts', fromAccounts.reducers),
    EffectsModule.forFeature([ProfileEffects, PasswordEffects]),
  ],
})
export class AccountModule { }
