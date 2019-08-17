import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupComponent } from './containers/signup/signup.component';
import { ResetPasswordEffects } from './effects/reset-password.effects';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { NewPasswordComponent } from './containers/new-password/new-password.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    SignupFormComponent,
    SignupComponent,
    ResetPasswordFormComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    NewPasswordFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects, ResetPasswordEffects])
  ]
})
export class AuthModule {}
